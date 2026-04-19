if (!$persistentStore.read("dongda_welcome")) {
  $notify(
    " DONGDAREALEST",
    "CONFIG ACTIVATED",
    "Enjoy Premium 🚀",
    {
      "open-url": "https://raw.githubusercontent.com/Dongdarealest/DONGUNLOCK/refs/heads/main/welcome.js"
    }
  );
  $persistentStore.write("1", "dongda_welcome");
}
$done({});
