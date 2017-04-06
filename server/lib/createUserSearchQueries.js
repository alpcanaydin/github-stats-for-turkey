const Moment = require('moment');
const MomentRange = require('moment-range');

const cities = require('../data/cities.json');

const exceptions = ['istanbul', 'ankara'];

const moment = MomentRange.extendMoment(Moment);
const range = Array.from(moment.range('2008-01-01', '2018-01-01').by('quarters'));

const reducer = (acc, cur, index, arr) => {
  if (arr.length - 1 === index) {
    return acc;
  }

  const start = cur.format('YYYY-MM-DD');
  const end = arr[index + 1].format('YYYY-MM-DD');

  return [...acc, `${start}..${end}`];
};
const quarters = range.reduce(reducer, []);

const createUserSearchQueries = () => {
  const queries = [];

  cities.forEach(city => {
    if (exceptions.indexOf(city) > -1) {
      const exceptionQueries = quarters.map(quarter => `location:${city} created:${quarter}`);
      queries.push(...exceptionQueries);
      return;
    }

    queries.push(`location:${city}`);
  });

  return queries;
};

module.exports = createUserSearchQueries;
