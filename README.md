
# JobzEngine

A simple solution that consists of a Web Scraper and an API that fetches the scraped results from Indeed.

### API
#### Get all items

```http
  GET /api/v1/jobs
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `number` |  API supports pagination by default, if this is not entered, it will serve the first page by default. |
| `sort_by` | `string` |  The field of which it is desired to use as criteria. Allowed criterias are: `title`, `location`, `description`,`technologies`,`post_date`, `company_name`|
| `sort_type` | `string` |  Orientation of which you want it sorted. Allowed values are `ascending`, `descending`|
| `location` | `string` |  Enter a string value to be partially-matched with any value in the location field in each job|
| `technology` | `string` |  Enter a string value to be partially-matched with any value in the technologies field in each job|


### Web Scraper
It's headless, but it will show some indicators in the command prompt. The scraper pulls job listings data from Indeed.
#### Run
```
  yarn webscrape
```