import fs from 'fs';

const msg = fs
    .readFileSync('.git/COMMIT_EDITMSG', 'utf-8')
    .trim() // 先去 .git/COMMIT_EDITMSG 文件中读取了 commit 提交的信息

const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/
if (!commitRE.test(msg)) { // 使用了正则去校验提交信息的格式
    if(!mergeRe.test(msg)) {
        console.log('git commit信息校验不通过')

        console.error(`git commit的信息格式不对, 需要使用 title(scope): desc的格式
      比如 fix: xxbug
      feat(test): add new 
      具体校验逻辑看 scripts/verifyCommit.js
    `)
        process.exit(1)
    }

}else{
    console.log('git commit信息校验通过')
}
