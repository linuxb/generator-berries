exports.serve = data => new Promise((resolve, reject) => {
  if (data) {
    setTimeout(() => {
      resolve(data);
    }, 500);
  } else {
    reject(new Error('TypeError with "data"'));
  }
});
