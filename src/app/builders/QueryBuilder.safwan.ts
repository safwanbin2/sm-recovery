class QueryBuilderSafwan {
  public modelQuery: Record<string, any>;
  public query: Record<string, any>;

  constructor(modelQuery: Record<string, any>, query: Record<string, any>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  paginate() {
    let page = Number(this?.query?.page) || 1;
    let limit = Number(this?.query?.limit) || 10;
    let skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.find().skip(skip).limit(limit);
    return this;
  }

  search(searchAbleFields: string[]) {
    let searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map((el) => ({
          [el]: { $regex: searchTerm, $options: "i" },
        })),
      });
    }
    return this;
  }

  filter() {
    let excludeFields = ["page", "limit", "sort", "searchTerm"];
    let queryObj = { ...this.query };
    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }
}
