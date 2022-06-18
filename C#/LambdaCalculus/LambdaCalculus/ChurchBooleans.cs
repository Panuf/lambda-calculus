using static LambdaCalculus.Calculus;

namespace LambdaCalculus
{
    public static class ChurchBooleans
    {
        public static Func<object, object> TRUE(object a) => K(a);

        public static Func<object, object> FALSE(object a) => KI(a);

        public static object NOT(Func<object, Func<object, object>> function) =>
            function(FALSE)(TRUE);

        public static object NOT_C(Func<object, Func<object, object>> function) =>
            C(function);

        public static Func<Func<object, Func<object, object>>, object> AND(Func<object, Func<object, object>> p) =>
            q => p(q)(p);

        public static Func<Func<object, Func<object, object>>, object> OR(Func<object, Func<object, object>> p) =>
            q => p(p)(q);

        public static Func<Func<object, Func<object, object>>, object> EQUALS(Func<object, Func<object, object>> p) =>
             q => p(q(TRUE)(FALSE))(q(FALSE)(TRUE));

        public static Func<object, Func<object, object>> IF(Func<object, Func<object, object>> condition) =>
            a => b => condition(a)(b);
    }
}
