import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const fetchToken = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:5173/")
    myHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    myHeaders.append("Authorization", "Basic c2VhdGF0dGhldGFibGUtYmJjOWZ2bTg6VktqenNPNV9Fb1ZWcU9SMnVPV3NNR0M5Z3FqZTQ5a1RWVXdwTk01Ng==");
    myHeaders.append("Cookie", "_abck=D3E95134B17DF98C79A0A56C858D2527~-1~YAAQkmvcF5I8pjaaAQAAAgYuYQ42jssvV4elI/tJ9K8/yrlEkpNQkTP1ZYcu5L+crDbILwQILP9nr+R+s94TSLo6W6NsRT4XNgMm7pmOyQjmqsR2F5bqtc43ZVAjvWM+zLUp5ggNDS6sftX6gWtBeFjCTKuTsv4c2MwZRMSZYwkvK010iBuFc0I2En4cUzrJPDCJ8Vm5mBibA0T5+ptaA2e42KvGSEMQGiRaLrTBI5ClsssuvEWzTBHzBV0N08ni2qDZEjks/5VVcYjLNjDgI6gCtYonDG0QFAbr9bmC3+uEd4AGCULCgop3V2UnXSk99rYrmY7QHrdP7Oi+FxMa9F01Ksjv3L4AZT2GvdIVb8nldrlyLpX5X+TkkxJewxMjQqRZC2tctVDckYTf5UsJW9anU3hLOjDd2JocL61uFkNV2GvpywE2V+rq~-1~-1~-1~-1~-1; bm_sz=6A40BF1F09F8025E241CF579D0659594~YAAQkmvcF5M8pjaaAQAAAgYuYR3sapj54u8h+osxtN2OIqbacOzHOWXYE4ys7UMgSpJHucUrAhuCoQPSWI6pn8UO+qglnTLRH2fBWqyp057Vcvrkvk5crsH/4EFiF4iPV8VGGSYWhjgSySmDakS1iJduSXm2ZZvlYE2P8PLXXoonqv6pmI7SCsNEtUogH9CADtScJXSknvgVpMkLuDiFeQFfI/qJiBACW4gciEUFcnxpCDg48OL8bCx34oq4YElVoh6FHcIvalgiYwaFR2t4KceyE/eV6EWAZUL89dnFnW5p6U/zC8y1m7R+Ye561ksKShr2TE5keLa1YA0zi0XGNy7FUUBj7TpajZSoQAYv5QErP76qTqflfnO1ZnDJ~4338738~4403779");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("scope", "product.compact");

    const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
    };

    return fetch("https://api.kroger.com/v1/connect/oauth2/token", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.access_token ?? null;
    })
    .catch((error) => {
        console.error(error);
        return null;
    });

}

app.get('/api/products', async (req, res) => {
  try {
    const access_token = await fetchToken();
    const response = await axios.get('https://api.kroger.com/v1/products?filter.term=milk&filter.limit=5', {
      params: req.query,
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));