export default async () => {
  try {
    const response = await fetch(
      "https://atg-scrapper-api-external-eks.eu-west-1.prod.hbi.systems/api/getproductlist?path=vitamins-supplements/new-in-vitamins-supplements/"
    );
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
