const util = require('../util');

class Site {
  constructor () {
    this.name = 'HDCITY';
    this.url = 'https://hdcity.city/';
  };

  async getInfo () {
    const info = {};
    const document = await this._getDocument(`${this.index}userdetails`, false);
    // 用户名
    info.username = document.querySelector('a[href*=userdetails] strong').innerHTML;
    // uid
    info.uid = +document.querySelector('#fh5co-page > center > div:nth-child(1) > div.text_alt > table > tbody > tr > td:nth-child(2) > div:nth-child(1) > b').nextSibling.nodeValue.trim();

    // 上传
    info.upload = document.querySelector('#bottomnav > div.button-group > a:nth-child(1) > i:nth-child(4)').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');

    console.log(info.upload)
    info.upload = util.calSize(...info.upload.split(' '));
    // 下载
    info.download = document.querySelector('#bottomnav > div.button-group > a:nth-child(1) > i:nth-child(5)').nextSibling.nodeValue.trim().replace(/(\w)B/, '$1iB');
    info.download = util.calSize(...info.download.split(' '));
    // 做种
    info.seeding = +document.querySelector('#bottomnav > div.button-group > a:nth-child(1) > span:nth-child(7)').textContent.trim();
    // 下载
    info.leeching = +document.querySelector('#bottomnav > div.button-group > a:nth-child(1) > span:nth-child(8)').textContent.trim();

    // 做种体积
    const seedingDocument = await this._getDocument(`${this.index}getusertorrentlistajax.php?userid=${info.uid}&type=seeding`, true);
    const seedingSize = (seedingDocument.match(/总大小\uff1a(\d+\.\d+ [KMGTP]B)/) || [0, '0 B'])[1].replace(/([KMGTP])B/, '$1iB');
    info.seedingSize = util.calSize(...seedingSize.split(' '));
    return info;
  };
};
module.exports = Site;
