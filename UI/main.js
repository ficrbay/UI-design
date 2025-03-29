let counter = 0;
function change_text(id, text) {
    let element = document.getElementById(id);
    let buttons = element.querySelectorAll(".button");
    
    buttons.forEach(button => {
        button.remove();
    });
}

function add_ai(content) {
    counter += 1;
    let msg = document.createElement('div');
    msg.className = 'message ai';
    msg.innerHTML = `
        <img src="https://scp-wiki.wdfiles.com/local--files/scp-3021/a.png" alt="AI Icon">
        <div class="message-content" id = "msg-${counter}">${content}</div>
    `;
    document.querySelector('.container').appendChild(msg);
}
function add_user(content) {
    counter += 1;
    let msg = document.createElement('div');
    msg.className = 'message user';
    msg.innerHTML = `
        <div class="message-content" id = "msg-${counter}">${content}</div>
        <img src="https://scp-wiki.wdfiles.com/local--files/scp-3021/b.png" alt="User Icon">
    `;
    document.querySelector('.container').appendChild(msg);
}
function node(ai_text, choices, side_effects, children) {
    if (side_effects === undefined) {
        side_effects = [];
    }
    return {ai_text: ai_text, choices: choices, side_effects: side_effects, children: children};
}
let resource_node = node("如您希望获取有关心理健康的帮助，您可以在<a href='https://zhuanlan.zhihu.com/p/343113502'>这里</a>找到一些资源。<br>如您遇到了紧急情况，建议您", []);
let quest_node = node("您此次咨询体验如何？是否有接受其他方面帮助的需求？", ["体验很好", "体验不好", "我想学习心理自助。", "我想找真人进行心理咨询。", "我想了解国内付费AI服务。", "能不能推荐一些国外的AI？"], [], [
    node("感谢您的反馈。期待与您下次相遇。", []),
    node("感谢您的反馈。我们会努力提高服务质量，期待与您下次相遇。", []),
    node("您可以参考以下资源：<br><a class='button_link' href='https://book.douban.com/review/14087856/'>伯恩斯焦虑自助疗法</a><br><a class='button_link' href='https://www.bilibili.com/video/BV1mi4y1j7DF'>武志红心理学课程</a>", []),
    resource_node,
    node("为您推荐以下服务：<br><a class='button_link' href='https://www.whitexiaomao.com/#/home'>白小喵</a><br><a class='button_link' href='https://nawacares.com/zh'>小鸟心理</a> <br><a class='button_link' href='https://www.moodtalker.com/pc/#/'>林间聊愈室</a>", []),
    node("为您推荐以下服务：<br><a class='button_link' href='https://chatgpt.com/'>ChatGPT</a><br><a class='button_link' href='https://talktoash.com/'>Ash</a><br>请您注意，这些服务可能在国内无法正常访问。", [])
]);
quest_node.children[2].children = quest_node.children[4].children = quest_node.children[5].children = [quest_node];
let insuff_node = node("十分抱歉。本产品不具有专业医疗功能，因此对您的状况不能提供实质性帮助。", [], [], [resource_node]);
let mobile = navigator.userAgent.match(/Mobi/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i);
if (mobile) {
    resource_node.ai_text += "点击下方按钮拨打希望24热线，及时寻求帮助。<br><a class=\"button_link\" href=\"tel:4001619995\">拨打电话</a>";
}
else {
    resource_node.ai_text += "拨打希望24热线（400-161-9995）等危机干预热线，及时寻求帮助。";
}

let score = 0;
let l1_node = node('系统为您自动匹配最具胜任力的AI：<br><a class="button_link" href="https://www.ai-beings.com/#/home">聆心智能</a><br>您也可以尝试此视频的内容：<br><iframe src="//player.bilibili.com/player.html?isOutside=true&aid=302083972&bvid=BV19P411L7gX&cid=805648737&p=1&danmaku=0" scrolling="no" frameborder="no"></iframe>', ["还有其他视频吗？"], [], [node("<iframe src=\"//player.bilibili.com/player.html?isOutside=true&aid=1256103509&bvid=BV1GJ4m1M7ar&cid=1617860853&p=1\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\" sandbox=\"allow-top-navigation allow-same-origin allow-forms allow-scripts\"></iframe>", [], [], [quest_node])]);
let l2_node = node('系统为您自动匹配最具胜任力的AI：<br><a class="button_link" href="https://github.com/SmartFlowAI/EmoLLM">emoLLM</a><br>在此也推荐您阅读《自控力：和压力做朋友》（〔美〕凯利·麦格尼格尔 著）或尝试微信小程序Nephola。', [], [], [quest_node]);
let l3_node = node('系统为您自动匹配最具胜任力的AI：Nephola<br>您可以在微信小程序中搜索到它。<br>您也可以参考此视频：<br><iframe src="//player.bilibili.com/player.html?isOutside=true&aid=634848676&bvid=BV1xb4y1q7uD&cid=458793856&p=1" scrolling="no" border="0" frameborder="no" allowfullscreen="true" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>', [], [], [quest_node]);
let med_node_next = node('系统为您自动匹配最有专业胜任力的AI：<br><a class="button_link" href="https://github.com/KarolynW/EmoGPT/blob/main/README.md">EmoGPT</a>', [], [], [quest_node])
let low_node = node("感谢您完成量表填写！<br>结果显示您无抑郁。请问您希望咨询哪方面的问题？", ["我有些迷茫，想咨询未来规划。", "我最近压力比较大，想要陪伴和指导。", "我心情不太好，希望得到一些情感支持。", "我的问题比较复杂，想得到一些专业的帮助。"], [], [l1_node, l2_node, l3_node, med_node_next]);
let med_node = node('感谢您完成量表填写！<br>结果显示您患有轻度抑郁。', [], [], [med_node_next]);
let high_node = node("感谢您完成量表填写！<br>结果显示您患有中度至重度抑郁。", [], [], [node("建议您尽快寻求医疗帮助。", [], [], [insuff_node])])
let scale_nodes = [];
function set_scale_exit() {
    let scale_node_exit;
    if (score <= 13) {
        scale_node_exit = low_node;
    }
    else if (score <= 19) {
        scale_node_exit = med_node;
    }
    else {
        scale_node_exit = high_node;
    }
    scale_nodes[20].children = [scale_node_exit,scale_node_exit,scale_node_exit,scale_node_exit];
}
let bk_list = [['我不觉得悲伤', '很多时候我都感到悲伤', '所有时间我都感到悲伤', '我太悲伤或太难过，不堪忍受'], ['我没有对未来失去信心', '我比以往更加对未来没有信心', '我感到前景黯淡', '我觉得将来毫无希望，且只会变得更糟'], ['我不觉得自己是个失败者', '我的失败比较多', '回首往事，我看到一大堆的失败', '我觉得自己是一个彻底的失败者'], ['我和过去一样能从喜欢的事情中得到乐趣', '我不能像过去一样从喜欢的事情中得到乐趣', '我从过去喜欢的事情中获得的快乐很少', '我完全不能从过去喜欢的事情中获得快乐'], ['我没有特别的内疚感', '我对自己做过或该做但没做的许多事感到内疚', '在大部分时间里我都感到内疚', '我任何时候都感到内疚'], ['我没觉得自己在受惩罚', '我觉得自己可能会受到惩罚', '我觉得自己会受到惩罚', '我觉得正在受到惩罚'], ['我对自己的感觉同过去一样', '我对自己丧失了信心', '我对自己感到失望', '我讨厌我自己'], ['与过去相比，我没有更多的责备或批评自己', '我比过去责备自己更多', '只要我有过失，我就责备自己', '只要发生不好的事情，我就责备自己'], ['我没有任何自杀的想法', '我有自杀的想法，但我不会去做', '我想自杀', '如果有机会我就会自杀'], ['和过去比较，我哭的次数并没有增加', '我比过去哭的多', '现在任何小事都会让我哭', '我想哭，但哭不出来'], ['我现在没有比过去更加烦躁', '我现在比过去更容易烦躁', '我非常烦躁或不安，很难保持安静', '我非常烦躁不安，必须不停走动或做事情'], ['我对其他人或活动没有失去兴趣', '和过去相比，我对其他人或事的兴趣减少了', '我失去了对其他人或事的大部分兴趣', '任何事情都很难引起我的兴趣'], ['我现在能和过去一样作决定', '我现在作决定比以前困难', '我作决定比以前困难了很多', '我作任何决定都很困难'], ['我不觉得自己没有价值', '我认为自己不如过去有价值或有用了', '我觉得自己不如别人有价值', '我觉得自己毫无价值'], ['我和过去一样有精力', '我不如从前有精力', '我没有精力做很多事情', '我做任何事情都没有足够的精力'], ['我没觉得睡眠有什么变化', '我的睡眠比过去略少，或略多', '我的睡眠比以前少了很多，或多了很多', '我根本无法睡觉，或我一直想睡觉'], ['我并不比过去容易发火', '与过去相比，我比较容易发火', '与过去相比，我非常容易发火', '我现在随时都很容易发火'], ['我没觉得食欲有什么变化', '我的食欲比过去略差，或略好', '我的食欲比去过去差了很多，或好很多', '我完全没有食欲，或总是非常渴望吃东西'], ['我和过去一样可以集中精神', '我无法像过去一样集中精神', '任何事情都很难让我长时间集中精神', '任何事情都无法让我集中精神'], ['我没觉得比过去累或乏力', '我比过去更容易累或乏力', '因为太累或者太乏力，许多过去常做的事情不能做了', '因为太累或者太乏力，大多数过去常做的事情都不能做了'], ['我没觉得最近对性的兴趣有什么变化', '我对性的兴趣比过去少了', '现在我对性的兴趣少多了', '我对性的兴趣已经完全丧失']];
function scale_node(i) {
    let choices = bk_list[i - 1];
    let final = (i === bk_list.length);
    if (final) {
        return node(`请回答第${i}题：以下哪个陈述句最符合您过去两周内（包括今天）的状态？如有多个符合，选择程度较严重的一项。`, choices, [set_scale_exit,function(){score+=1;set_scale_exit();},function(){score+=2;set_scale_exit();},function(){score+=3;set_scale_exit();}]);
    }
    return node(`请回答第${i}题：以下哪个陈述句最符合您过去两周内（包括今天）的状态？如有多个符合，选择程度较严重的一项。`, choices, [function(){},function(){score+=1;},function(){score+=2;},function(){score+=3;}]);
}
for (let i = 0; i < 21; ++i) {  
    scale_nodes.push(scale_node(i + 1));
}
scale_nodes[0].ai_text = "为更好地向您提供服务，请您跟随我进行贝克抑郁量表的填写流程。<br>" + scale_nodes[0].ai_text;

let root_node = node("您好！在开始之前，请您知晓：本项目仅为您推荐匹配来访需要的AI，不会获取您的任何隐私信息，具体的隐私政策请关注AI服务实际提供方。<br>您是否同意接受本项目提供的服务？", ["我同意", "我不同意"]);
let node1 = node("感谢您的支持。<br>您在过去2年内是否有心理疾病的医院诊断？", ["有", "没有"]);
let node2 = node("感谢您的反馈。", []);

root_node.children = [node1, node2];
node1.children = [insuff_node, scale_nodes[0]];
for (let i = 0; i < 20; ++i) {
    scale_nodes[i].children = [scale_nodes[i+1],scale_nodes[i+1],scale_nodes[i+1],scale_nodes[i+1]];
}
scale_nodes[8].children[2] = scale_nodes[8].children[3] = insuff_node;

let current_node = root_node;

async function use_current_node() {
    try {
        const ai_text_enhanced = await enhanceText(current_node.ai_text);
        add_ai(ai_text_enhanced);
    } catch (error) {
        console.error("AI 文本润色失败", error);
        add_ai(current_node.ai_text);
    }

    if (current_node.choices.length > 0) {
        let user_content = "";
        for (let i = 0; i < current_node.choices.length; i++) {
            user_content += await button(current_node.choices[i], i) + "<br>";
        }
        
        let button_container = document.createElement('div');
        button_container.className = 'message user';
        button_container.innerHTML = `
            <div class="message-content" id="buttons-${counter}">${user_content}</div>
            <img src="https://scp-wiki.wdfiles.com/local--files/scp-3021/b.png" alt="User Icon">
        `;
        document.querySelector('.container').appendChild(button_container);
    }
}
function choose(i) {
    if (current_node.side_effects[i] !== undefined) {
        current_node.side_effects[i]();
    }
    current_node = current_node.children[i];
    use_current_node();
    while (current_node.choices.length === 0 && current_node.children !== undefined) {
        current_node = current_node.children[0];
        use_current_node();
    }
}
async function enhanceText(text) {
    try {
        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        return data.response; 
    } catch (error) {
        console.error("润色 API 调用失败", error);
        return text; 
    }
}

async function button(text, i) {
    return `<button class="button" onclick="handleButtonClick(event, ${i})">${text}</button>`;
}
function handleButtonClick(event, i) {
    const button = event.target;
    const buttonText = button.textContent;
    
    const buttonContainer = button.closest('.message.user');
    if (buttonContainer) {
        buttonContainer.remove();
    }
    
    add_user(buttonText);
    
    choose(i);
}
use_current_node();