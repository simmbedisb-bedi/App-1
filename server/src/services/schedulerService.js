const cron = require("node-cron");
const { sendSMS, notificationSchedule } = require("./smsService");

let activeJobs = [];

function startScheduler() {
  // Clear any existing jobs
  activeJobs.forEach(job => job.destroy());
  activeJobs = [];

  notificationSchedule.forEach(({ cron: cronExpr, name, getMessage }) => {
    const job = cron.schedule(cronExpr, async () => {
      console.log(`⏰ Firing notification: ${name}`);
      const message = getMessage();
      await sendSMS(message);
    }, {
      timezone: "America/New_York", // Change to your timezone
    });

    activeJobs.push(job);
    console.log(`📅 Scheduled: ${name} (${cronExpr})`);
  });

  console.log(`\n✅ Scheduler running — ${activeJobs.length} daily notifications active\n`);
}

function stopScheduler() {
  activeJobs.forEach(job => job.destroy());
  activeJobs = [];
  console.log("⏹️  Scheduler stopped");
}

function getScheduleStatus() {
  return notificationSchedule.map(({ name, cron: cronExpr }) => ({
    name,
    cron: cronExpr,
    active: activeJobs.length > 0,
  }));
}

module.exports = { startScheduler, stopScheduler, getScheduleStatus };
