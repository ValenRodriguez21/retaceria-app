const CATEGORIAS_POR_METRO = ['Telas', 'Entretelas']

/** Mínimo de venta: 10 cm = 0,1 m */
export const MIN_METROS = 0.1
export const MIN_CENTIMETROS = 10
export const PASO_METROS = 0.1

export function esPorMetro(categoria: string): boolean {
  return CATEGORIAS_POR_METRO.includes(categoria)
}

export function unidadMedida(categoria: string): string {
  return esPorMetro(categoria) ? 'metros' : 'unidades'
}

export function cantidadMinima(categoria: string): number {
  return esPorMetro(categoria) ? MIN_METROS : 1
}

export function pasoCantidad(categoria: string): number {
  return esPorMetro(categoria) ? PASO_METROS : 1
}

/** Ajusta la cantidad al mínimo permitido. */
export function normalizarCantidad(categoria: string, cantidad: number): number {
  if (!esPorMetro(categoria)) {
    return Math.max(1, Math.floor(cantidad))
  }

  return Math.max(MIN_METROS, cantidad)
}

export function cantidadValida(
  categoria: string,
  cantidad: number,
  stockMax?: number,
): boolean {
  if (esPorMetro(categoria)) {
    if (cantidad < MIN_METROS) return false
  } else if (cantidad < 1 || !Number.isInteger(cantidad)) {
    return false
  }

  if (stockMax !== undefined && cantidad > stockMax) return false
  return true
}
