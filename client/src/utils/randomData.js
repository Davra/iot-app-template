export const generateRandomData = () => {
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 365);
  var temp = 1200;
  var arr = [];
  for (var i = 0; i < 365; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    temp += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    chartData.push({
      date: newDate,
      temperature: temp,
    });
    arr.push(temp);
  }

  return { chartData: chartData, arr: arr };
};
