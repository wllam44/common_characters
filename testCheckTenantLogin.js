const checkTenantLoginFormat = (mallId, urlName, tenantLogin) => {
  const splitUrlName = urlName.split('/');
  const splitTenantId = tenantLogin.split(/-(.+)/)
  
  if (splitUrlName.length > 1 && splitTenantId.length > 1) {
    const urlNameWithoutMall = splitUrlName[1].toLowerCase();
    const tenantIdWithoutMall = splitTenantId[1].toLowerCase();

    if (urlNameWithoutMall.includes(tenantIdWithoutMall)){
      return true;
    } else if(urlNameWithoutMall.match(/[\u3400-\u9FFF]/)) {
      return true;
    }
    else {
      return false;
    }
  }
  return false;
}

console.log('');
console.log(checkTenantLoginFormat('', 'peak-galleria/men-wah-bing-ten', 'pg-men-wah-bing-teng'));
console.log('');