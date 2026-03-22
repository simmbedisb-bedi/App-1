const cron = require("node-cron");
const { sendSMS, notificationSchedule } = require("./smsService");

let activeJobs = [];

function startScheduler() {
  activeJobs.forEach(job => job.destroy());
  activeJobs = [];

  const tz = process.env.TIMEZONE || "America/New_York";

  notificationSchedule.forEach(({ cron: cronExpr, name, getMessage }) => {
    const job = cron.schedule(cronExpr, async () => {
      console.log(`⏰ Firing notification: ${name}`);
      await sendSMS(getMessage());
    }, { timezone: tz });

    activeJobs.push(job);
    console.log(`📅 Scheduled [${tz}]: ${name} (${cronExpr})`);
  });

  console.log(`\n✅ ${activeJobs.length} notifications scheduled (timezone: ${tz})\n`);
}

function stopScheduler() {
  activeJobs.forEach(job => job.destroy());
  activeJobs = [];
}

function getScheduleStatus() {
  return notificationSchedule.map(({ name, cron: cronExpr, label, emoji }) => ({
    name, cron: cronExpr, label, emoji, active: activeJobs.length > 0,
  }));
}

module.exports = { startScheduler, stopScheduler, getScheduleStatus };
