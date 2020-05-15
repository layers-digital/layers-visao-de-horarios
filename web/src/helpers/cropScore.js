export default function cropScore (score) {
  if(!score) return null
    
  if(isNaN(Number(score))) {
    return score
  }
  
  return score.substring(0, 3)
}