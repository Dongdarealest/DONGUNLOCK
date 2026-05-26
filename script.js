// =========================================================
// LOGIC SƠ KHỞI: HỆ THỐNG ÂM THANH MICRO AUDIO
// =========================================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSuccessSound() {
  const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
  osc.type = 'sine'; osc.frequency.setValueAtTime(880, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
  osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.15);
}

// =========================================================
// LOGIC 1: ĐIỀU HƯỚNG BƯỚC CÀI ĐẶT
// =========================================================
const stepOrder = ['1', '2', 'ios', 'ios-download', 'ios-next', 'ios-step-3', 'ios-step-4', 'ios-step-5', 'ios-step-6'];
const androidStepOrder = ['1', '2', 'android'];

function updateProgressBar(currentStepId) {
  let currentOrder = stepOrder;
  if (currentStepId === 'android' || (!stepOrder.includes(currentStepId) && document.getElementById('step-android').classList.contains('active'))) {
    currentOrder = androidStepOrder;
  }
  const currentIndex = currentOrder.indexOf(currentStepId);
  if (currentIndex === -1) return;
  const currentStepNum = currentIndex + 1; const totalSteps = currentOrder.length; const percent = Math.round((currentStepNum / totalSteps) * 100);
  const progressBar = document.getElementById('progress-bar-fill');
  document.getElementById('progress-text').innerText = `TIẾN TRÌNH: 0${currentStepNum} / 0${totalSteps}`;
  document.getElementById('progress-percent').innerText = `${percent}%`;
  if(progressBar) progressBar.style.width = `${percent}%`;
}

function nextStep(nextStepId) {
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  const nextStepEl = document.getElementById(`step-${nextStepId}`);
  if (nextStepEl) { nextStepEl.classList.add('active'); updateProgressBar(nextStepId); }
}

function prevStep(prevStepId) {
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  const prevStepEl = document.getElementById(`step-${prevStepId}`);
  if (prevStepEl) { prevStepEl.classList.add('active'); updateProgressBar(prevStepId); }
}

// =========================================================
// LOGIC 2: ĐỒNG BỘ GITHUB & PING
// =========================================================
let githubDownloadCount = 0; const BASE_MOCK_USERS = 1420;

async function measureServerPing() {
  const startTime = performance.now();
  try {
    await fetch('https://api.github.com', { method: 'HEAD', cache: 'no-store' });
    const ping = Math.round(performance.now() - startTime);
    const pingEl = document.getElementById('server-ping');
    if(pingEl) pingEl.innerHTML = `<span class="ping-dot"></span> ${ping} ms`;
  } catch (error) {
    const pingEl = document.getElementById('server-ping');
    if(pingEl) pingEl.innerHTML = `<span class="ping-dot" style="background-color: #f43f5e;"></span> ERROR`;
  }
}

async function fetchGitHubData() {
  const repoOwner = "Dongdarealest"; 
  const repoName = "DONGUNLOCK";
  const changelogEl = document.getElementById('changelog-text');
  const versionEl = document.getElementById('app-version');

  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`);
    
    if (response.ok) {
      const data = await response.json();
      
      // Update Version
      if (data.tag_name && versionEl) versionEl.innerText = data.tag_name.toUpperCase();
      
      // FIX LỖI Ở ĐÂY: Hiển thị nội dung ngay cả khi nó ngắn
      if (data.body && changelogEl) {
        changelogEl.innerText = data.body;
      } else {
        if (changelogEl) changelogEl.innerText = "Chưa có ghi chú cập nhật.";
      }
      
      githubDownloadCount = data.assets ? data.assets.reduce((sum, a) => sum + a.download_count, 0) : 0;
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
  
  animateUserCounter();
}

function animateUserCounter() {
  const localAndroidClicks = parseInt(localStorage.getItem('local_android_success') || '0');
  const localIosClicks = parseInt(localStorage.getItem('local_ios_success') || '0');
  const targetNumber = BASE_MOCK_USERS + githubDownloadCount + localAndroidClicks + localIosClicks;
  const counterEl = document.getElementById('total-users');
  if(!counterEl) return;
  let currentNum = 0; const steps = 40; const increment = Math.ceil(targetNumber / steps);
  const timer = setInterval(() => {
    currentNum += increment;
    if (currentNum >= targetNumber) { clearInterval(timer); counterEl.innerText = targetNumber.toLocaleString() + " ✔️"; }
    else { counterEl.innerText = currentNum.toLocaleString(); }
  }, 30);
}

function completeSetup(platform) {
  if (platform === 'android') {
    localStorage.setItem('local_android_success', parseInt(localStorage.getItem('local_android_success') || '0') + 1);
    showToast('Đang mở ứng dụng...', 'success');
    setTimeout(() => window.location.href = "locket://", 1000);
  } else if (platform === 'ios') {
    localStorage.setItem('local_ios_success', parseInt(localStorage.getItem('local_ios_success') || '0') + 1);
    showToast('Đang khởi động Shadowrocket...', 'success');
    setTimeout(() => window.location.href = "shadowrocket://", 1500);
  }
  setTimeout(() => nextStep('1'), 2000);
}

// =========================================================
// LOGIC 3: TIỆN ÍCH
// =========================================================
function openGitHubIssue() { window.open(`https://github.com/Dongdarealest/DONGUNLOCK/issues/new`, '_blank'); }

function toggleTheme() {
  const body = document.body; const themeIcon = document.getElementById('theme-icon');
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  if(themeIcon) themeIcon.innerText = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function showToast(message, type = 'success') {
  playSuccessSound();
  const toast = document.getElementById('toast');
  const textContent = document.getElementById('toast-text-content');
  if(toast && textContent) {
    textContent.innerText = message; 
    toast.className = ''; 
    toast.classList.add('show', type);
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
}

function copyLink() {
  const input = document.getElementById("configLink");
  if(input) {
    input.select();
    navigator.clipboard.writeText(input.value);
    showToast("📋 Đang mở Shadowrocket...", "success");
    setTimeout(() => window.location.href = `shadowrocket://add/config?url=${encodeURIComponent(input.value)}`, 800);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateProgressBar('1'); fetchGitHubData(); measureServerPing();
  setInterval(measureServerPing, 10000);
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') { document.body.classList.add('light-mode'); const icon = document.getElementById('theme-icon'); if(icon) icon.innerText = '☀️'; }
});

window.addEventListener('online', () => { const net = document.getElementById('network-overlay'); if(net) net.style.display = 'none'; });
window.addEventListener('offline', () => { const net = document.getElementById('network-overlay'); if(net) net.style.display = 'flex'; showToast('Mất mạng!', 'error'); });