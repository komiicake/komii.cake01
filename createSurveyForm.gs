/**
 * 臺中市私立承恩居家長照機構 居家服務滿意度調查問卷
 * 執行 createSurveyForm() 一次，會自動建立 Google 表單 + 回覆試算表。
 */
function createSurveyForm() {
  var form = FormApp.create('居家服務滿意度調查問卷');
  form.setDescription(
    '親愛的服務使用者及家屬，您好：\n' +
    '為了使我們的服務品質更加提升、嘉惠更多需要服務的長輩，特別定期進行問卷調查，' +
    '懇請您撥冗提供寶貴的意見。問卷資料僅供本服務單位改進參考，請您安心作答，謝謝！'
  );
  form.setConfirmationMessage('～非常感謝您的配合與不吝指教，您所提供的意見，將作為我們改善服務的參考～');
  form.setAllowResponseEdits(false);
  form.setCollectEmail(false);
  form.setProgressBar(true);

  // ===== 基本資料 =====
  form.addTextItem().setTitle('服務個案姓名').setRequired(true);
  form.addMultipleChoiceItem()
      .setTitle('受訪對象')
      .setChoiceValues(['案主本人', '主要照顧者／家屬'])
      .showOtherOption(true)   // 「其他」選項，選了之後可自行填寫是誰
      .setRequired(true);

  form.addListItem()
      .setTitle('開始服務時間已持續')
      .setChoiceValues([
        '半年內', '一年內', '二年內', '三年內', '四年內', '五年內', '五年以上'
      ])
      .setRequired(true);

  form.addCheckboxItem()
      .setTitle('服務內容種類（可複選）')
      .setChoiceValues([
        'BA01 基本身體清潔',
        'BA02 基本日常照顧',
        'BA03 測量生命脈象',
        'BA04 協助餵食或灌食',
        'BA05 餐食照顧',
        'BA07 協助沐浴及洗頭',
        'BA10 翻身拍背',
        'BA11 肢體關節活動',
        'BA12 協助上(下)樓梯',
        'BA13 陪同外出',
        'BA14 陪同就醫',
        'BA15 家務協助',
        'BA16 代購或代領或代送服務',
        'BA17 協助執行補助性醫療',
        'BA18 安全看視',
        'BA20 陪伴服務',
        'BA23 協助洗頭',
        'BA24 協助排泄',
        '喘息服務'
      ])
      .setRequired(true);

  // ===== 問卷題目 =====
  form.addSectionHeaderItem().setTitle('滿意度調查');

  var satisfy = ['非常滿意', '滿意', '尚可', '不滿意', '非常不滿意'];
  var help = ['非常有幫助', '略有幫助', '尚可', '沒有幫助', '非常沒幫助'];

  addMC(form, '一、您對照服員的服務態度滿意嗎？', satisfy);
  addMC(form, '二、您對照服員的服務品質滿意嗎？', satisfy);
  addMC(form, '三、照服員是否依約定準時到府服務？',
        ['準時', '偶爾遲到', '經常遲到', '經常早退', '經常遲到早退']);
  addMC(form, '四、照服員是否經常因故與案家調班請假？',
        ['從不請假調班', '偶爾調班', '尚可', '經常請假調班', '任意變更服務']);
  addMC(form, '五、您認為本單位提供之服務對您與家屬的「身心改善」是否有幫助？', help);
  addMC(form, '六、您認為本單位提供之服務對您與家屬的「生活改善」是否有幫助？', help);
  addMC(form, '七、您認為本單位提供之服務對您與家屬的「環境改善」是否有幫助？', help);
  addMC(form, '八、您對本單位的服務態度滿意嗎？', satisfy);

  form.addParagraphTextItem()
      .setTitle('九、您對本單位的建議與回饋')
      .setRequired(false);

  // ===== 回覆自動存到試算表 =====
  var ss = SpreadsheetApp.create('居家服務滿意度調查_回覆');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('填答網址（給居服員用）：' + form.getPublishedUrl());
  Logger.log('表單編輯網址：' + form.getEditUrl());
  Logger.log('回覆試算表：' + ss.getUrl());
}

// 用「選擇題方格」：選項會橫向排成一列，列印出來也是橫向，每題只能勾一個
function addMC(form, title, choices) {
  form.addGridItem()
      .setTitle(title)
      .setRows(['請勾選'])
      .setColumns(choices)
      .setRequired(true);
}
