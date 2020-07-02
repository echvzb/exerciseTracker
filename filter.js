// UserInfo is Object
// interp. UserID, UserName and Logs about one user exercise
// UserName is String
// UserID is String
// Logs is Array

const user = {
  userId: '5ef437e44ac2c92311e1408b',
  username: 'eduardochvzb',
  count: 2,
  log: [
    {
      description: 'Cardio con Mariana',
      duration: 60,
      date: '2020-06-25T05:39:44.069Z',
    },
    { description: 'run', duration: 20, date: '2020-06-10T00:00:00.000Z' },
  ],
};
let query = { min: '2020-05-01', max: '2020-06-10', limit: 0};

const parseDate = date => date.toString().slice(0, 15);

function filterLog(log, query, functions) {
  let min, max, customInfo = {};

  if (query.min) {
    min = new Date(query.min);
    customInfo.from = parseDate(min);
  }
  if (query.max) {
    max = new Date(query.max);
    customInfo.to = parseDate(max);
  }
  let tempLog = [];

  const check = d => functions.less(d, min) && functions.greater(d, max);
  
  log.forEach( obj => {
    if(query.limit<=0){
      return
    }
    let d = new Date(obj.date);
    if (check(d)) {
      obj.date = parseDate(d);
      tempLog.push(obj);

      query.limit = query.limit-1;
    }
  });
  return {tempLog, customInfo};
}
function checkUserQuery(user, query) {
  let functions = {};
  let {userId,username,log,count} = user;

  if (!query.max) {
    functions.greater = d => true;
  } else {
    functions.greater = (d, max) => d <= max;
  }
  if (!query.min) {
    functions.less = d => true;
  } else {
    functions.less = (d, min) => d >= min;
  }
  if(!query.limit && query.limit!=0){
    query.limit = log.length;
  }
  const {tempLog, customInfo} = filterLog(user.log, query, functions);

  let tempObj = {userId,username};
  for(let key in customInfo){
    tempObj[key] = customInfo[key];
  }

  return Object.assign({},tempObj,{count,tempLog});
}

console.log(checkUserQuery(user, query));
