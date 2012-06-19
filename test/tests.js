$(document).ready(function(){
    
  test("function getFriendlyTimes", function() {
    expect(3);
    msg = "Function getFriendlyTimes did not match";
    deepEqual(getFriendlyTimes(80,180), ["1:20", "3:00"], msg);
    deepEqual(getFriendlyTimes(0, 50), ["0:00", "0:50"], msg);
    deepEqual(getFriendlyTimes(5, 67), ["0:05", "1:07"], msg);
  });

});