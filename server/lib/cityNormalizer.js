const synonyms = {
  antakya: 'hatay',
  adapazari: 'sakarya',
  adapazarı: 'sakarya',
  izmit: 'kocaeli',
  icel: 'mersin',
  içel: 'mersin',
  afyon: 'afyonkarahisar',
};

const cityNormalizer = query => {
  const city = query.split(' ')[0].replace('location:', '');
  const normalized = city
    .replace(",", "") // ex : Istanbul, Turkey
    .replace(/İ/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ğ/g, 'g')
    .replace(/ş/g, 's')
    .toLowerCase();

  if (Object.prototype.hasOwnProperty.call(synonyms, normalized)) {
    return synonyms[normalized];
  }

  return normalized;
};

module.exports = cityNormalizer;
