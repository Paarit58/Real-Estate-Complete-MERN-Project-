class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    if (Object.keys(this.queryString).length) {
      console.log(this.queryString);
      let queryObj = { ...this.queryString };
      const excludedFields = ["fields", "sort", "page", "limit", "search"];
      excludedFields.forEach((field) => {
        if (queryObj[field]) {
          delete queryObj[field];
        }
      });
      console.log(queryObj);
      let queryStr = JSON.stringify(queryObj);
      console.log(queryStr);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      queryObj = JSON.parse(queryStr);

      console.log(queryObj);

      this.query = this.query.find(queryObj);
      // this.query = this.query.find({ name: { '$regex': '/Cottage/' } });
    }
    return this;
  }

  search() {
    if (this.queryString.search) {
      this.query = this.query.find({
        name: { $regex: this.queryString.search, $options: "i" },
      });
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
    if (this.queryString.page || this.queryString.limit) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit || 10;
      this.query = this.query.skip((page - 1) * limit).limit(limit);
    }
    return this;
  }
}
export default ApiFeatures;
