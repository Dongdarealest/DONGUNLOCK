let time = new Date().toLocaleTimeString('vi-VN');
let hour = new Date().getHours();
let greeting = "Chào bạn, ";
if (hour < 12) greeting = "Chào buổi sáng 🌅, ";
else if (hour < 18) greeting = "Chào buổi chiều ☕, ";
else greeting = "Chào buổi tối 🌙, ";

$done({
  title: " DONGDAREALEST",
  content: greeting + "\nHệ thống Premium đang hoạt động ổn định.\nCập nhật lần cuối: " + time,
  icon: "checkmark.shield.fill",
  "icon-color": "#147efb"
});
