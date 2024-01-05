/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {

  const categoryMap = new Map();

  transactions.forEach(function(transaction){
    const { category,price } = transaction;

    if(categoryMap.has(category)){
      let value = categoryMap.get(category);
      value = value+price;
      categoryMap.set(category,value);
    }else{
      categoryMap.set(category,price);
    }

  });

  const res = [];

  categoryMap.forEach((totalSpent,category)=>{
    res.push({category,totalSpent});
  })
  return res;
  
}

module.exports = calculateTotalSpentByCategory;
