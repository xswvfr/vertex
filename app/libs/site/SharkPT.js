const util = require('../util');

class Site {
  constructor () {
    this.name = 'SharkPT';
    this.url = 'https://sharkpt.net/';
  };

  async getInfo () {
    const info = {};
    const document = await this._getDocument(this.index, false, 10);
    // 用户名
    info.username = document.querySelector('a[href*=userdetails] b').innerHTML;
    // uid
    info.uid = +document.querySelector('a[href*=userdetails]').href.match(/id=(\d+)/)[1];
    // 上传
    info.upload = document.querySelector('span[class=uploaded]').nextSibling.textContent.replace(/(\w)B/, '$1iB');
    info.upload = util.calSize(...info.upload.split(' '));
    // 下载
    info.download = document.querySelector('span[class=downloaded]').nextSibling.textContent.replace(/(\w)B/, '$1iB');
    info.download = util.calSize(...info.download.split(' '));
    // 做种
    info.seeding = +document.querySelector('span[class=seeding]').nextSibling.textContent;
    // 下载
    info.leeching = +document.querySelector('span[class=leeching]').nextSibling.textContent;
    // 做种体积
    const seedingDocument = await this._getDocument(`${this.index}getusertorrentlistajax.php?userid=${info.uid}&type=seeding`, true);
    const seedingSize = (seedingDocument.match(/总大小\uff1a(\d+\.\d+ [KMGTP]B)/) || [0, '0 B'])[1].replace(/([KMGTP])B/, '$1iB');
    info.seedingSize = util.calSize(...seedingSize.split(' '));
    return info;
  };
};
module.exports = Site;
