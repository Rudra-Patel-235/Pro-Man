
#include <iostream>
using namespace std;

class GfG {
public:
    static int val;
};

// Initialize static member
int GfG::val = 22;
int main() {
    
    // Access without creating object
    cout << GfG::val << endl;
}

------------------------------------------------------------------------

#include <iostream>
using namespace std;

class Geeks {
private:
    int private_variable;

protected:
    int protected_variable;

public:
    Geeks() {
        private_variable = 10;
        protected_variable = 99;
    }

    // friend class declaration
    friend class GFG;
};

// class GFG is declared as a friend
// inside class Geeks, therefore
// Class GFG can access private members
// of class Geeks.
class GFG {
public:
    void display(Geeks& t) {
        cout << "The value of Private Variable = "
             << t.private_variable << endl;
        cout << "The value of Protected Variable = "
             << t.protected_variable;
    }
};

int main() {
    Geeks g;
    GFG fri;
    fri.display(g);
    return 0;
}
-------------------------------------------------------------------------

#include <iostream>
using namespace std;

// Forward Declaration needed
class base;

// Another class in which function is declared
class GFG {
public:
    void GFG_Function(base& obj);
};

// Base class declare a frined
// function of another class
class base {
private:
    int private_variable;

protected:
    int protected_variable;

public:
    base() {
        private_variable = 10;
        protected_variable = 99;
    }

    // Friend function declaration
    friend void GFG::GFG_Function(base&);
};

// Friend function definition
void GFG::GFG_Function(base& obj) {
    cout << "Private Variable: " << 
             obj.private_variable
         << endl;
    cout << "Protected Variable: " << 
             obj.protected_variable;
}

int main() {
    base object1;
    GFG object2;
    object2.GFG_Function(object1);

    return 0;
}
-------------------------------------------------------------------------

#include <iostream>
using namespace std;

class A {
public:
    int val;
    
    // Parameterized constructor
    A(int x) {
        val = x;
    }
    
    // Copy constructor
    A(A& a) {
        val = a.val;
    }
};

int main() {
    A a1(20);
    
    // Creating another object from a1
    A a2(a1);
    
  	cout << a2.val;
    return 0;
}



-------------------------------------------------------------------------

#include <iostream>
using namespace std;

class Base {
public:
    // Compiler "declares" constructor
};

class A {
public:
    // User defined constructor
    A() { cout << "A Constructor" << endl; }

    // Uninitialized
    int size;
};

class B : public A {
    // Compiler defines default constructor of B,
    // and inserts stub to call A constructor
    // Compiler won't initialize any data of A
};

class C : public A {
public:
    C()
    {
        // User defined default constructor of C
        // Compiler inserts stub to call A's constructor
        cout << "C Constructor" << endl;

        // Compiler won't initialize any data of A
    }
};

class D {
    A a;
public:
    D()
    {
        // User defined default constructor of D
        // a - constructor to be called, compiler inserts
        // stub to call A constructor
        cout << "D Constructor" << endl;

        // Compiler won't initialize any data of 'a'
    }
};

// Driver Code
int main()
{
    Base base; // Only Base constructor (default provided by the compiler) is called
    B b; // Calls A's constructor due to inheritance (compiler-generated constructor for B)
    C c; // Calls A's constructor first, then C's constructor
    D d; // Calls A's constructor for member 'a', then D's constructor

    return 0;
}

-------------------------------------------------------------------------

A a1;
    a1.x = 10;
    cout << "a1's x = " << a1.x << endl;

    // Creating another object using a1
  	// Copy Constructor Calling
    A a2(a1);
    cout << "a2's x = " << a2.x;

-------------------------------------------------------------------------
// C++ program to implement the
// deep copy
#include <iostream>
using namespace std;

// Box Class
class box {
private:
    int length;
    int* breadth;
    int height;

public:
    // Constructor
    box()
    {
        breadth = new int;
    }

    // Function to set the dimensions
    // of the Box
    void set_dimension(int len, int brea,
                       int heig)
    {
        length = len;
        *breadth = brea;
        height = heig;
    }

    // Function to show the dimensions
    // of the Box
    void show_data()
    {
        cout << " Length = " << length
             << "\n Breadth = " << *breadth
             << "\n Height = " << height
             << endl;
    }

    // Parameterized Constructors for
    // for implementing deep copy
    box(box& sample)
    {
        length = sample.length;
        breadth = new int;
        *breadth = *(sample.breadth);
        height = sample.height;
    }

    // Destructors
    ~box()
    {
        delete breadth;
    }
};

// Driver Code
int main()
{
    // Object of class first
    box first;

    // Set the dimensions
    first.set_dimension(12, 14, 16);

    // Display the dimensions
    first.show_data();

    // When the data will be copied then
    // all the resources will also get
    // allocated to the new object
    box second = first;

    // Display the dimensions
    second.show_data();

    return 0;
}

-------------------------------------------------------------------------
// C++ program to demonstrate a program which will throw an
// error
#include <iostream>
using namespace std;

class myInteger {
private:
    int value;

public:
  
  	// parameterized constructor
    myInteger(int v) {
        value = v;
    }

    //...other things in class
};

int main() {
    myInteger I1;
    getchar();
    return 0;
}

output : error: no default constructor exists for class "myInteger"

-------------------------------------------------------------------------


-------------------------------------------------------------------------

