import { 
  PublicKey, 
  Transaction, 
  TransactionInstruction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Connection
} from '@solana/web3.js';
import { Buffer } from 'buffer';
import type { InsuranceData } from '../navigators/AppNavigator';

export const INSURANCE_PROGRAM_ID = new PublicKey('8epbA4eCd1ieFndY5y8gZzNqmu91rMUdaY3rDVX5tZKj');

// Instruction discriminators (these would be defined by your program)
export enum InsuranceInstruction {
  CreateInsurance = 0,
  ActivateInsurance = 1,
  ClaimInsurance = 2,
  CancelInsurance = 3,
}

export interface CreateInsuranceParams {
  description: string;
  indicator: string;
  threshold: string;
  period: number;
  premium: number;
  maxPayout: number;
  reliability: number;
}

export class InsuranceProgram {
  static createInsuranceInstruction(
    payer: PublicKey,
    insuranceAccount: PublicKey,
    params: CreateInsuranceParams
  ): TransactionInstruction {
    // Serialize the instruction data
    const data = Buffer.alloc(1024); // Adjust size based on your program's requirements
    let offset = 0;
    
    // Write instruction discriminator
    data.writeUInt8(InsuranceInstruction.CreateInsurance, offset);
    offset += 1;
    
    // Write description (max 128 bytes)
    const descBytes = Buffer.from(params.description.slice(0, 128));
    data.writeUInt32LE(descBytes.length, offset);
    offset += 4;
    descBytes.copy(data, offset);
    offset += descBytes.length;
    
    // Write indicator (max 32 bytes)
    const indicatorBytes = Buffer.from(params.indicator.slice(0, 32));
    data.writeUInt32LE(indicatorBytes.length, offset);
    offset += 4;
    indicatorBytes.copy(data, offset);
    offset += indicatorBytes.length;
    
    // Write threshold (max 32 bytes)
    const thresholdStr = String(params.threshold);
    const thresholdBytes = Buffer.from(thresholdStr.slice(0, 32));
    data.writeUInt32LE(thresholdBytes.length, offset);
    offset += 4;
    thresholdBytes.copy(data, offset);
    offset += thresholdBytes.length;
    
    // Write numeric values
    data.writeUInt32LE(params.period, offset);
    offset += 4;
    
    // Convert SOL amounts to lamports
    const premiumLamports = Math.floor(params.premium * LAMPORTS_PER_SOL);
    data.writeBigUInt64LE(BigInt(premiumLamports), offset);
    offset += 8;
    
    const maxPayoutLamports = Math.floor(params.maxPayout * LAMPORTS_PER_SOL);
    data.writeBigUInt64LE(BigInt(maxPayoutLamports), offset);
    offset += 8;
    
    data.writeUInt8(params.reliability, offset);
    offset += 1;
    
    return new TransactionInstruction({
      keys: [
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: insuranceAccount, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: INSURANCE_PROGRAM_ID,
      data: data.subarray(0, offset),
    });
  }
  
  static async createInsurance(
    connection: Connection,
    payer: PublicKey,
    insuranceData: InsuranceData
  ): Promise<Transaction> {
    // Validate required fields
    if (!insuranceData.description || !insuranceData.indicator) {
      throw new Error('Missing required insurance data fields');
    }
    
    // Derive insurance account address (PDA)
    const [insuranceAccount] = await PublicKey.findProgramAddress(
      [
        Buffer.from('insurance'),
        payer.toBuffer(),
        Buffer.from(insuranceData.id || Date.now().toString()),
      ],
      INSURANCE_PROGRAM_ID
    );
    
    const instruction = this.createInsuranceInstruction(
      payer,
      insuranceAccount,
      {
        description: insuranceData.description || '',
        indicator: insuranceData.indicator || '',
        threshold: insuranceData.threshold || '0',
        period: insuranceData.period || 0,
        premium: insuranceData.premium || 0,
        maxPayout: insuranceData.maxPayout || 0,
        reliability: insuranceData.reliability || 95,
      }
    );
    
    const transaction = new Transaction().add(instruction);
    
    // Get recent blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payer;
    
    return transaction;
  }
}