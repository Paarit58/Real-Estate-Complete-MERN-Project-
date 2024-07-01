class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    if (this.queryString.length) {
      const queryObj = { ...this.queryString };
      const excludedFields = ["fields", "sort", "page", "limit"];
      excludedFields.forEach((field) => {
        if (queryObj[field]) {
          delete queryObj[field];
        }
      });
      const queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      queryObj = JSON.parse(queryStr);

      this.query = this.query.find(queryObj);
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    if (this.query.page) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.query.limit || 10;
      this.query = this.query.skip((page - 1) * limit).limit(limit);
    }
    return this;
  }
}
export default ApiFeatures;
