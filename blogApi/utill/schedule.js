var cronJob = require('node-cron');

var demoSchedule = cronJob.schedule('* * * * *', function() {
  console.log('running every minute 1, 2, 4 and 5');
});
