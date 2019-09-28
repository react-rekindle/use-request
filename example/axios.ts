import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://dog.ceo/api',
  timeout: 1000,
})

instance.interceptors.response.use(function (response) {
  return response.data.message
}, function (error) {
  return Promise.reject(error)
})

interface Breeds {
  [propName: string]: string[];
}

export function listAllBreeds (): Promise<Breeds> {
  return instance.get('/breeds/list/all')
}

export function getRandomImagesOfBreeds (breed: string): string {
  return instance.get(`/breed/${breed}/images/random`)
}

interface BreedsList {
  key: string;
  value: string;
}

export function transform (data: Breeds): BreedsList[] {
  const result: BreedsList[] = []

  Object.entries(data).forEach(([key, value]) => {
    if (value.length > 0) {
      result.push(...value.map(item => ({
        key: key + '/' + item,
        value: item + ' ' + key,
      })))
    } else {
      result.push({
        key,
        value: key,
      })
    }
  })

  return result
}
