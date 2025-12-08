import { initStorage } from "@/utils/platformOperation"

initStorage()


//  通过阻塞指定url 来解除b站登录检测和弹窗
chrome.runtime.onInstalled.addListener(async () => {
  try {
    const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
    const oldRuleIds = oldRules.map(rule => rule.id);

    const newRules = [
      {
        id: 1,
        priority: 1,
        action: { type: "block" as chrome.declarativeNetRequest.RuleActionType },
        condition: {
          urlFilter: "||api.bilibili.com/x/web-interface/nav*",
          resourceTypes: ["xmlhttprequest", "sub_frame", "other", "ping"] as chrome.declarativeNetRequest.ResourceType[],
          initiatorDomains: ["www.bilibili.com"]  // 新增：匹配发起域
        }
      },
  
    ];

    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: oldRuleIds,
      addRules: newRules
    });

    console.log("规则更新成功：", newRules.length, "条规则已添加");
    const currentRules = await chrome.declarativeNetRequest.getDynamicRules();
    console.log("当前动态规则：", currentRules.map(r => ({ id: r.id, urlFilter: r.condition.urlFilter })));
  } catch (error) {
    console.error("规则更新失败：", (error as Error).message);
  }
});

// 匹配调试
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info : chrome.declarativeNetRequest.MatchedRuleInfoDebug) => {
  console.log("规则匹配成功！URL:", info.request.url, "规则 ID:", info.rule.ruleId, "方法:", info.request.method, "发起域:", info.request.initiator);
});
