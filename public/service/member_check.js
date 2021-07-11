const Check= class CheckCustomer {
  //判斷空值
  static checkNull(data) {
    for (var key in data) {
      // 不為空
      return false;
    }
    // 為空值
    return true;
  }
};
module.exports = Check;