import pb from '../pocketbase';

export default async function getExchangeById(exchangeId) {
  try {
    const record = await pb.collection('exchangeList').getOne(exchangeId);
    return record;
  } catch (error) {
    console.error('Error getting exchange by ID:', error);
    throw error;
  }
}
