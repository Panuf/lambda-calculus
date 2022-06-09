import { C, K, KI } from "./calculus";

// TRUE := λx.λy.x (K)
// FALSE := λx.λy.y (KI)
export const TRUE = K;
export const FALSE = KI;

// NOT := λp.p FALSE TRUE
// p can be a boolean so either TRUE or FALSE. 
// TRUE is a function (K) that selects first value, so executing TRUE(FALSE)(TRUE) would yield FALSE.
// FALSE is a function (KI) that selects second value, so executing FALSE(FALSE)(TRUE) would return TRUE;
export const NOT = p => p(FALSE)(TRUE)

// Applying cardinal to TRUE/FALSE would result in the same behaviour, as it switches function arguments
export const NOT_C = p => C(p);

// AND := λpq.p q p 
// if p is TRUE then it selects value of q, which either is TRUE or FALSE and thus AND value is determined by it.
// if p is FALSE then it select value of p, which is FALSE.
export const AND = p => q => p(q)(p);

// OR := λpq.p p q
// if p is TRUE then it select value of p, which is TRUE.
// if p is FALSE then it select value of q, which is TRUEN or FALSE and thus OR value is determined by it.
export const OR = p => q => p(p)(q);

// OR can be expresed using M by doing Mxy which would evalute to xxy which exactly the same as 
// application of xy to or as (λpq.p p q)x y = xxy

// BOOLEAN_EQUALITY := λpq.p(q TRUE FALSE)(q FALSE TRUE)
// p selects evaluation strategy, if TRUE then booleans are equal if q is TRUE (and its selects TRUE),
// if FALSE than booleans are equal if q is also FALSE (and its selected true)
export const BOOLEAN_EQUALITY = p => q => p(q(TRUE)(FALSE))(q(FALSE)(TRUE));
// This could be simplified:
// (q TRUE FALSE) can be replaced with q, as this is boolean
// (q FALSE TRUE) can be replaced with NOT q.
export const BOOLEAN_EQUALITY_SIMPLIFIED = p => q => p(q)(NOT(q));

// Having defined above new boolean operations can be derived, ie. XOR by applying NOT to BOOLEAN_EQUALITY.

// De Morgan's Laws can be expressed:
// ¬ (P ∨ Q) = (¬ P) ∧ (¬ Q): BOOLEAN_EQUALITY (NOT(OR p q)) (AND (NOT p) (NOT q))
// ¬ (P ∧ Q) = (¬ P) ∨ (¬ Q): BOOLEAN_EQUALITY (NOT(AND p q)) (OR (NOT p) (NOT q))
export const DE_MORGAN_LAWS_1 = p => q => BOOLEAN_EQUALITY(NOT(OR(p)(q)))(AND(NOT(p))(NOT(q)));
export const DE_MORGAN_LAWS_2 = p => q => BOOLEAN_EQUALITY(NOT(AND(p)(q)))(OR(NOT(p))(NOT(q)));

// IF THEN ELSE - function that takes three arguments: boolean and two functions and selects one of them:
// λpab.p a b
export const IF_THEN_ELSE = p => a => b => p(a)(b)