const fetch = require('node-fetch');
const moment = require('moment');

// const qs =  require('./node_modules/qs/dist/qs.js');

/* need to handle passcode duplicated found */
/* need to handle incorrect login format */

const main = async() =>{
  try {
    const prodUrl = "https://copax79h2d.execute-api.ap-southeast-1.amazonaws.com/prod/v1/tenant/list";
    const uatUrl = "https://yglcvj9197.execute-api.ap-southeast-1.amazonaws.com/uat/v1/tenant/list";

    const fetchProdResponse = await fetch(prodUrl);
    const prodTenants = await fetchProdResponse.json();

    const fetchUatResponse = await fetch(uatUrl);
    const uatTenats = await fetchUatResponse.json();

    let response = { status: 0 };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    };

    for (let i = 0; i < prodTenants.length; i += 1) {
      console.log(`loading: ${i}/${prodTenants.length}`);
      let prodTenant = prodTenants[i];

      const foundTenant = uatTenats.find(tenant => `${tenant.id}` === `${prodTenant.id}`);

      /*
      if(!foundTenant) {
        const createUrl = "https://yglcvj9197.execute-api.ap-southeast-1.amazonaws.com/uat/v1/tenant/create";
        const param = {
          _id: prodTenant._id,
          name: prodTenant.name,
          address: prodTenant.address,
          about: prodTenant.about,
          website: prodTenant.website,
          thumbnailUrl: prodTenant.thumbnailUrl,
          thumbnailAlt: prodTenant.thumbnailAlt,
          meta: prodTenant.meta,
          categories: prodTenant.categories,
          diningCategories: prodTenant.diningCategories,
          tags: prodTenant.tags,
          tenantTags: prodTenant.tenantTags,
          isHidden: prodTenant.isHidden,
          loyaltyInclude: prodTenant.loyaltyInclude,
          mall: prodTenant.mall,
          shopNo: prodTenant.shopNo,
          floor: prodTenant.floor,
          openingHours: prodTenant.openingHours,
          phone: prodTenant.phone,
          banners: prodTenant.banners,
          products: prodTenant.products,
          passcode: '',
          urlName: prodTenant.urlName,
          tenantLogin: prodTenant.tenantLogin,
          tenantPw: prodTenant.tenantPw,
          poiId: prodTenant.poiId,
          acceptHLSV: prodTenant.acceptHLSV,
        };

        const createResponse = await fetch(createUrl, {
          method: 'POST', 
          body: qs.stringify(param),
          headers: headers
        });
        const create = await createResponse.json();
        console.log('create', create);
      }
      */
      /*
      if (foundTenant) {
        console.log('foundTenant', foundTenant.id);
        const updateUrl = "https://yglcvj9197.execute-api.ap-southeast-1.amazonaws.com/uat/v1/tenant/update";

        const param = {
          id: foundTenant.id,
          name: foundTenant.name,
          phone: foundTenant.phone,
          address: foundTenant.address,
        };

        const updateResponse = await fetch(updateUrl, {method: 'POST', body: qs.stringify(param), headers: headers } );
        const update = await updateResponse.json();
        console.log('update', update);
      }
      */
      /* 
      else {
        const createUrl = "https://yglcvj9197.execute-api.ap-southeast-1.amazonaws.com/uat/v1/tenant/create";

        const param = {
          _id: prodTenant._id,
          name: prodTenant.name,
          address: prodTenant.address,
          about: prodTenant.about,
          website: prodTenant.website,
          thumbnailUrl: prodTenant.thumbnailUrl,
          thumbnailAlt: prodTenant.thumbnailAlt,
          meta: prodTenant.meta,
          categories: prodTenant.categories,
          diningCategories: prodTenant.diningCategories,
          tags: prodTenant.tags,
          tenantTags: prodTenant.tenantTags,
          isHidden: prodTenant.isHidden,
          loyaltyInclude: prodTenant.loyaltyInclude,
          mall: prodTenant.mall,
          shopNo: prodTenant.shopNo,
          floor: prodTenant.floor,
          openingHours: prodTenant.openingHours,
          phone: prodTenant.phone,
          banners: prodTenant.banners,
          products: prodTenant.products,
          passcode: prodTenant.passcode,
          urlName: prodTenant.urlName,
          tenantLogin: prodTenant.tenantLogin,
          tenantPw: prodTenant.tenantPw,
          poiId: prodTenant.poiId,
          acceptHLSV: prodTenant.acceptHLSV,
        };

        const createResponse = await fetch(createUrl, {
          method: 'POST', 
          body: qs.stringify(param),
          headers: headers
        });
        const create = await createResponse.json();
        console.log('create', create);
      }
      */
      console.log('');
    }
  } catch (error) {
    console.log('error: ', error);
  }
};

//main();
console.log('ready to code')