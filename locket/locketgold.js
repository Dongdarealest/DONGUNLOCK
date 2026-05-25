// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};
// =========   Phần cố định  ========= // 
//  // 
var ua=$request.headers["User-Agent"]||$request.headers["user-agent"],obj=JSON.parse($response.body);obj.Attention="Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";var Dongdarealest={is_sandbox:!1,ownership_type:"PURCHASED",billing_issues_detected_at:null,period_type:"normal",expires_date:"2099-12-18T01:04:17Z",grace_period_expires_date:null,unsubscribe_detected_at:null,original_purchase_date:"2004-12-09T01:04:18Z",purchase_date:"2024-07-28T01:04:17Z",store:"app_store"},Dongdarealestne={grace_period_expires_date:null,purchase_date:"2024-07-28T01:04:17Z",product_identifier:"com.Dongdarealest.premium.yearly",expires_date:"2099-12-18T01:04:17Z"};const match=Object.keys(mapping).find(e=>ua.includes(e));if(match){let[e,s]=mapping[match];s?(Dongdarealestne.product_identifier=s,obj.subscriber.subscriptions[s]=Dongdarealest):obj.subscriber.subscriptions["com.Dongdarealest.premium.yearly"]=Dongdarealest,obj.subscriber.entitlements[e]=Dongdarealestne}else obj.subscriber.subscriptions["com.Dongdarealest.premium.yearly"]=Dongdarealest,obj.subscriber.entitlements.pro=Dongdarealestne;$done({body:JSON.stringify(obj)});
