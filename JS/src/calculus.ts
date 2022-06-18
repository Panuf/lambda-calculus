// I:= λx.x (identity) returns what was provided
export const I = x => x;

// M:= λf.ff (self-application) applies function to itself
export const M = f => f(f);

// K:= λab.a (first) always returns first value
// actually this should be \a.\b.a so passing first argument as x would result in function \b.x 
export const K = a => b => a;

// KI:= λab.b (second) always returns second value
export const KI = a => b => b;

// C:= λfab.fba (flip) calls function with arguments inversed
export const C = f => a => b => f(b)(a);

// By having cardinal one can define KI as C K.
// The same could be done for K as C KI
export const KI_C = a => b => C(K)(a)(b);
export const K_C = a => b => C(KI)(a)(b)