using FluentAssertions;
using static LambdaCalculus.Calculus;

namespace LambdaCalculus.Tests
{
    public class CalculusTests
    {
        [Fact]
        public void Identity_ForOne_ReturnsOne()
        {
            I(1).Should().Be(1);
        }

        [Fact]
        public void Identity_ForIdentity_ReturnsIdentity()
        {
            Func<object, object> identity = I;
            I(identity).Should().Be(identity);
        }

        [Fact]
        public void SelfApplication_ForIdentity_ReturnsIdentity()
        {
            Func<object, object> identity = I;
            M(identity).Should().Be(identity);
        }

        [Theory]
        [InlineData(1, null)]
        [InlineData(1, 2)]
        [InlineData(1, "a")]
        public void First_ForAnyTwoParameters_ReturnsFirstArgument(object first, object second)
        {
            K(first)(second).Should().Be(first);
        }

        [Theory]
        [InlineData(null, 2)]
        [InlineData(1, 2)]
        [InlineData("a", 2)]
        public void Second_ForAnyTwoParameters_ReturnsSecondArgument(object first, object second)
        {
            KI(first)(second).Should().Be(second);
        }

        [Fact]
        public void Flip_ForKAndOneAndTwo_ReturnsTwo()
        {
            C(K)(1)(2).Should().Be(2);
        }

        [Fact]
        public void Flip_ForKIAndOneAndTwo_ReturnsOne()
        {
            C(KI)(1)(2).Should().Be(1);
        }

        [Fact]
        public void Second_ExpressedByFlip_ShouldBehaveAsRegularSecond()
        {
            var actual = KI_C(1)(2);
            actual.Should().Be(2).And.Be(KI(1)(2));
        }

        [Fact]
        public void First_ExpressedByFlip_ShouldBehaveAsRegularFirst()
        {
            var actual = K_C(1)(2);
            actual.Should().Be(1).And.Be(K(1)(2));
        }
    }
}