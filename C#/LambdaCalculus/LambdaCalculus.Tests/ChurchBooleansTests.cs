using FluentAssertions;
using static LambdaCalculus.ChurchBooleans;

namespace LambdaCalculus.Tests
{
    public class ChurchBooleansTests
    {
        [Fact]
        public void Not_ForTrue_ReturnsFalse()
        {
            AssertIsFalse(NOT(TRUE));
        }

        [Fact]
        public void Not_ForFalse_ReturnsTrue()
        {
            AssertIsTrue(NOT(FALSE));
        }

        [Fact]
        public void NotC_ForTrue_ReturnsFalse()
        {
            AssertIsFalse(NOT_C(TRUE));
        }

        [Fact]
        public void NotC_ForFalse_ReturnsTrue()
        {
            AssertIsTrue(NOT_C(FALSE));
        }

        [Fact]
        public void And_FalseFalse_ReturnsFalse() => AndTest(FALSE, FALSE, AssertIsFalse);

        [Fact]
        public void And_FalseTrue_ReturnsFalse() => AndTest(FALSE, TRUE, AssertIsFalse);

        [Fact]
        public void And_TrueFalse_ReturnsFalse() => AndTest(TRUE, FALSE, AssertIsFalse);

        [Fact]
        public void And_TrueTrue_ReturnsTrue() => AndTest(TRUE, TRUE, AssertIsTrue);

        private static void AndTest(Func<object, Func<object, object>> first, Func<object, Func<object, object>> second, Action<object> assertion) =>
            assertion(AND(first)(second));

        [Fact]
        public void Or_FalseFalse_ReturnsFalse() => OrTest(FALSE, FALSE, AssertIsFalse);

        [Fact]
        public void Or_TrueFalse_ReturnsTrue() => OrTest(TRUE, FALSE, AssertIsTrue);

        [Fact]
        public void Or_FalseTrue_ReturnsTrue() => OrTest(FALSE, TRUE, AssertIsTrue);

        [Fact]
        public void Or_TrueTrue_ReturnsTrue() => OrTest(TRUE, TRUE, AssertIsTrue);

        private static void OrTest(Func<object, Func<object, object>> first, Func<object, Func<object, object>> second, Action<object> assertion) =>
            assertion(OR(first)(second));

        [Fact]
        public void Equals_FalseFalse_ReturnsTrue() => EqualsTest(FALSE, FALSE, AssertIsTrue);

        [Fact]
        public void Equals_TrueFalse_ReturnsFalse() => EqualsTest(TRUE, FALSE, AssertIsFalse);

        [Fact]
        public void Equals_FalseTrue_ReturnsFalse() => EqualsTest(FALSE, TRUE, AssertIsFalse);

        [Fact]
        public void Equals_TrueTrue_ReturnsTrue() => EqualsTest(TRUE, TRUE, AssertIsTrue);

        private static void EqualsTest(Func<object, Func<object, object>> first, Func<object, Func<object, object>> second, Action<object> assertion) =>
            assertion(EQUALS(first)(second));

        [Fact]
        public void If_ForTrue_ReturnsTrueBranch()
        {
            var trueBranch = (int a) => a * 2;
            var falseBranch = (int a) => a / 2;

            var branch = IF(TRUE)(trueBranch)(falseBranch);
            ((Func<int, int>)branch)(4).Should().Be(8);
        }

        [Fact]
        public void If_ForFalse_ReturnsFalseBranch()
        {
            var trueBranch = (int a) => a * 2;
            var falseBranch = (int a) => a / 2;

            var branch = IF(FALSE)(trueBranch)(falseBranch);
            ((Func<int, int>)branch)(4).Should().Be(2);
        }

        private static void AssertIsTrue(object function) => AssertBoolean(function, 1);

        private static void AssertIsFalse(object function) => AssertBoolean(function, 2);

        private static void AssertBoolean(object function, int expected)
        {
            function.Should().BeOfType(typeof(Func<object, Func<object, object>>));
            ((Func<object, Func<object, object>>)function)(1)(2).Should().Be(expected);
        }
    }
}
