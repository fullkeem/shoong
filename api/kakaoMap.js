import axios from 'axios';

export default async function handler(req, res) {
  const kakaoApiKey = process.env.KAKAO_MAP_API_KEY;
  const { query } = req;

  try {
    const response = await axios.get(
      'https://dapi.kakao.com/v2/maps/your_endpoint',
      {
        headers: {
          Authorization: `KakaoAK ${kakaoApiKey}`,
        },
        params: query,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Kakao API' });
  }
}
