namespace LambdaCalculus
{
    public static class Calculus
    {

        public static object I(object a) => a;

        public static object M(Func<object, object> function) =>
            function.Invoke(function);

        public static Func<object, object> K(object a) =>
            b => a;

        public static Func<object, object> KI(object a) =>
            b => b;

        public static Func<object, Func<object, object>> C(Func<object, Func<object, object>> function) =>
            (a) => (b) => function(b)(a);

        public static Func<object, object> KI_C(object a) =>
            b => C(K)(a)(b);

        public static Func<object, object> K_C(object a) =>
            b => C(KI)(a)(b);
    }
}