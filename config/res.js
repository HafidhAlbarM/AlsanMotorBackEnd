exports.ok = (resQuery, message, res)=>{
  var data = {
      'success': true,
      'data': (resQuery) ? resQuery : {},
      'message': (message) ? message : ''
  };
  res.json(data);
  res.end();
};