// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: "Category",
      name: "category",
      type: "document",
      fields: [
        {
          title: "Name",
          name: "name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Primary Image",
          name: "primaryImage",
          type: "image",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Items",
          name: "items",
          type: "array",
          of: [{ type: "reference", to: [{ type: "item" }] }],
        },
      ],
    },
    {
      title: "Item",
      name: "item",
      type: "document",
      fields: [
        {
          title: "Name",
          name: "name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Primary Image",
          name: "primaryImage",
          type: "image",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Price",
          name: "price",
          type: "number",
          description: "An integer number of cents",
          validation: (Rule) =>
            Rule.required()
              .min(0)
              .integer()
              .error("Items must have a price of at least 0 cents"),
        },
      ],
    },
  ]),
});
