import { Octokit } from "@octokit/rest";
import { ResponseInterface, RepoPathInterface } from 'src/utils/interface';

export const getSingleRepoDetails = async (
  octokit: Octokit,
  repo: string
) => {

  const {ownerName, repoName} = getOwnerRepositoryName(repo);
  const response = await octokit.request(`GET /repos/${ownerName}/${repoName}`, {
    owner: ownerName,
    repo: repoName,
  });

  return response;
};


export const structureResponse = async (
  repositoryDetails,
  repositories: string[]
): Promise<ResponseInterface[]> => {

  return repositoryDetails.map((repoDetail, index) => {
    return {
      repoName: getOwnerRepositoryName(repositories[index]).repoName,
      repoDescription: repoDetail.data.description,
      noOfStars: repoDetail.data.stargazers_count,
    };
  });
};


const getOwnerRepositoryName = (repoPath: string): RepoPathInterface => {
  const pathValues: string[] = repoPath.split('/');

  return {
    ownerName: pathValues[0],
    repoName: pathValues[1],
  };
};