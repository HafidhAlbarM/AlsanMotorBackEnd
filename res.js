exports.ok = (data, message, res)=>{
  var data = {
      'status': 200,
      'data': (data) ? data : {},
      'message': (message) ? message : ''
  };
  res.json(data);
  res.end();
};