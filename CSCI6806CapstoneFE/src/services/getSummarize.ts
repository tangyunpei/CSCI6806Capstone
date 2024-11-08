import { request } from '@/services/request';

export interface GetSummerizeParams {
    input_string: string;
  }
function splitTextIntoChunks(text: string, maxWords: number): string[] {
  const words = text.split(' ');
  let chunks: string[] = [];
  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(' '));
  }
  return chunks;
}

export function getSummarize(params: GetSummerizeParams) {
  return request({
    url: '/api/get_summarize',
    method: 'POST',
    data: params,
    withCredentials: false,
  });
}