export const getRepositoryTree = `
{
  repository(owner: "liferay", name: "liferay-frontend-guidelines") {
    defaultBranchRef {
      target {
        ... on Commit {
          tree {
            entries {
              name
              extension
              object {
                ... on Tree {
                  entries {
                    name
                    path
                    extension
                   
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
