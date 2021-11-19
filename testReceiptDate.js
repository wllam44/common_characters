const moment = require('moment');

const time = '12:00:00';
let dateSource = '04 05/09/21';

/*
const str = "dd-mm-yyyy06-06-2018 yyyy-mm-dd 2018-02-12 d-m-yy 1-1-18 dd-mm-yy 18-12-12 mm-d-yyyy 12-2-2018 m-dd-yyyy 1-12-2018 yy-m-d 18-1-1 yy-mm-d 18-12-3 yyyy-2018-1-1 04 05-09-21 1-1-2018 3-5-18 2018-1-2 09-8-2018"
*/

//const str = "27/05/2021 21/05/2021 09/08/21 03/05/2021 9/8/21"
//const str = "27/05/2021 21/05/2021 17/08.2021 29/09/2021 2021/09/05 21/09/05 2021/9/9";

/*
const str = '時間:2021/09/29 單:2021-09-29 09/09/2021 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 10/09/2021,09/09/2021, 09/09/2021, 時間:2021/09/29, REF 2017, 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 09/09/2021, 2021/09/29, 開單時間:2021-09-13, Date: 2021-09-29, REF 2017, 時間:2021/09/29, 時間: 2021/09/29, 開單時間:2021-09-13, Date: 2021-09-29, 時間:2021/09/29, Date: 2021-09-29, Date: 2021-09-29, 開單:2021-09-29, 開單:2021-09-29, 開單:2021-09-29,日期:21/07/28, 日期:21/07/28, 04 05/09/21, 04 05/09/21, 23/11, 日期:21/07/28, 2001, 04 05/09/21, 日期:21/07/28, 日期:21/07/28, Date 2008/2001, 27/05/2021, 04 05/09/21, 04 05/09/21, 日期/時間:\n箱, Date 21/05/2021, 日期:21/07/28, 日期:21/07/28, 04 05/09/21, 04 05/09/21, 11/08/2021, 17/08/2021, Date: 2021-09-22, 時間: 2021/09/29, 2021/09/29, 30/09/2021, 日期/時間:\nD:\n17/08.2021, 23/09/2021, 23/09/2021, 23/09/2021, 23/09/2021, SHOP, 29/09/2021, 30/09/2021, 29/09/2021, 29/09/2021, 29/09/2021, 29/09/2021, 23/09/2021, 23/09/2021';
*/

const str = "11-08-21 30-9-2021 5-9-2021 9-8-21 21-5-9 8-12-2021";


let dateSources = str.match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g);
const now = new Date();
console.log('dateSources: ', dateSources);


const appendLeadingZeroToDay = (year, month, day) => {
  if(day.length < 2){
    const newDay = '0' + day;
    return year + '-' +  month + '-' + newDay;
  }
  else{
    return year + '-' +  month + '-' + day;
  }
}

const getDateFormat = (dateSource, dayFirstFormat, monthFirstFormat, now) => {
  const dayFirst = moment(dateSource, dayFirstFormat).diff(now, 'days');
  const monthFirst = moment(dateSource, monthFirstFormat).diff(now, 'days');

  console.log('dayFirst: ', dayFirst);
  console.log('monthFirst: ', monthFirst);

  if(dayFirst >= monthFirst && dayFirst <= 0){
    console.log('1')
    return dayFirstFormat;
  } else if(monthFirst > dayFirst && monthFirst <= 0){
    console.log('2')
    return monthFirstFormat;
  } else if(isNaN(dayFirst)){
    console.log('3')
    return monthFirstFormat
  } else if(isNaN(monthFirst)){
    console.log('4')
    return dayFirstFormat;
  } else if(Math.abs(monthFirst) > Math.abs(dayFirst)){
    console.log('monthFirst')
    return monthFirstFormat;
  }
  console.log('dayFirst');
  return dayFirstFormat;
}

const getDateAndFormat = (dateSource, now) => {
  let revisedDateSource = dateSource;
  let dateFormat = '';
  const nowYear = now.getFullYear().toString();
  const nowYearLastTwoDigit = nowYear.slice(-2);
  const nowYearFirstTwoDigit = nowYear.slice(0, 2);

  if (dateSource.length < 8) {
    const yymd = dateSource.match(/(\d{2})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
    const xxyy = dateSource.match(/(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{2})/);

    if (yymd) {
      //console.log('yymd');
      const firstTwoDigit = dateSource.slice(0, 2);
      const lastTwoDigit = dateSource.slice(-2);
      if (firstTwoDigit === nowYearLastTwoDigit) {
        revisedDateSource = appendLeadingZeroToDay(yymd[1], yymd[2], yymd[3]);
        revisedDateSource = nowYearFirstTwoDigit + revisedDateSource;
        dateFormat = 'YYYY-MM-DD';
      } else if (lastTwoDigit === nowYearLastTwoDigit) {
        revisedDateSource = dateSource.slice(0, -2) + nowYearFirstTwoDigit + dateSource.slice(-2);
        dateFormat = getDateFormat(dateSource, 'DD-MM-YYYY', 'MM-DD-YYYY', now);
      }
    } else if (xxyy) {
      revisedDateSource = dateSource.slice(0, -2) + nowYearFirstTwoDigit + dateSource.slice(-2);
      dateFormat = getDateFormat(dateSource, 'D-M-YYYY', 'M-D-YYYY', now);
    }
  } else if (dateSource.length > 8) {
    const yyyymmdd = dateSource.match(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
    const xxxxyyyy = dateSource.match(/(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})/);

    if (yyyymmdd) {
      //console.log('yyyymmdd');
      revisedDateSource = appendLeadingZeroToDay(yyyymmdd[1], yyyymmdd[2], yyyymmdd[3]);
      dateFormat = 'YYYY-MM-DD';
    } else if (xxxxyyyy) {
      dateFormat = getDateFormat(dateSource, 'DD-MM-YYYY', 'MM-DD-YYYY', now);
    }
  } else {
    const yyyymd = dateSource.match(/(\d{4})[.\-/](\d{1})[.\-/](\d{1})/);
    const xxyyyy = dateSource.match(/(\d{1})[.\-/](\d{1})[.\-/](\d{4})/);
    const xxxxxx = dateSource.match(/(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{1,2})/);

    if (yyyymd) {
      revisedDateSource = appendLeadingZeroToDay(yyyymd[1], yyyymd[2], yyyymd[3]);
      dateFormat = 'YYYY-MM-DD';
    } else if (xxyyyy) {
      dateFormat = getDateFormat(dateSource, 'DD-MM-YYYY', 'MM-DD-YYYY', now);
    } else if (xxxxxx) {
      const firstTwoDigit = dateSource.slice(0, 2);
      const lastTwoDigit = dateSource.slice(-2);
      if (firstTwoDigit === nowYearLastTwoDigit) {
        revisedDateSource = nowYearFirstTwoDigit + dateSource;
        dateFormat = 'YYYY-MM-DD';
      } else if (lastTwoDigit === nowYearLastTwoDigit) {
        revisedDateSource = dateSource.slice(0, -2) + nowYearFirstTwoDigit + dateSource.slice(-2);
        dateFormat = getDateFormat(dateSource, 'DD-MM-YYYY', 'MM-DD-YYYY', now);
      }
    }
  }
  return [revisedDateSource, dateFormat];
};

for(var i=0; i<dateSources.length; i++ ){
  let dateSource = dateSources[i];
  let dateFormat = '', result = '';

  console.log('dateSource: ', dateSource);

  [dateSource, dateFormat] = getDateAndFormat(dateSource, now);

  console.log('dateFormat: ', dateFormat);

  if (!dateFormat) {
    result = '';
  } else {
    let utcDate = '';
    try {
      dateFormat += ' HH:mm:ss';
      
      const diffWithCurrent = moment(dateSource + time, dateFormat).diff(now, 'days');
      //console.log('diffWithCurrent: ', diffWithCurrent);
      if (isNaN(diffWithCurrent) || diffWithCurrent < -365 || diffWithCurrent > 0) {
        result = '';
      }
      else{
        utcDate = moment(dateSource + time, dateFormat).utc().format('YYYY-MM-DD HH:mm:ss');  
      }
    } catch (err) {
      console.log(
        `{ "tag": "error", "call": "${'postOCRResult'}", "error": ${JSON.stringify(serializeError(err))} }`
      );
    }
    if (utcDate && utcDate !== 'Invalid date') {
      result = moment.utc(utcDate).format('YYYY-MM-DDTHH:mm:ss');
    } else {
      result = '';
    }
  }

  console.log('result : ', result);
  console.log(' ');
}


