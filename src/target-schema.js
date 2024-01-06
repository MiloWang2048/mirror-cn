import * as joi from "joi";

export const targetSchema = joi.object({
  namespace: joi.string(),
  repoName: joi.string(),
  commands: joi.array().items(joi.string()),
  tags: joi.array().items(
    joi.object({
      tagName: joi.string(),
      digest: joi.string(),
    })
  ),
});

export const targetArraySchema = joi.array().items(targetSchema);
