import pb from '../pocketbase';

export default async function fetchExchangeDetail(id) {
  return await pb.collection('photoCards').getOne(id, {
    expand: 'exchangeList',
  });
}
