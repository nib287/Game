export function calcTileType(index) {  
  if (index === 63) return 'bottom-right'; 
  if (index === 56) return 'bottom-left'; 
  if (index === 7) return 'top-right';
  if (index === 0) return 'top-left';
  if (!(index % 8)) return 'left';
  if (!((index + 1) % 8)) return 'right';
  if (index > 56) return 'bottom';
  if (index > 8) return 'center';
  if (index > 0) return 'top';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}




