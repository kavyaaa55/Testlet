import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const questions = [
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-object-identity",
"text": "Two objects with identical field values are created separately. Which statement best describes them?",
"options": ["They are always equal in memory", "They share the same reference automatically", "They are distinct unless explicitly referenced", "They merge during runtime optimization"],
"answer": 2,
"explanation": "Objects created separately occupy different memory unless explicitly assigned.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-class-instantiation",
"text": "What happens if a class has no constructor defined?",
"options": ["Compilation fails", "A default constructor is implicitly created", "Objects cannot be created", "All fields remain uninitialized"],
"answer": 1,
"explanation": "Languages like Java/C++ provide a default constructor if none is defined.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-memory-model",
"text": "Which part of an object is shared across all instances of a class?",
"options": ["Instance variables", "Local variables", "Static members", "Object references"],
"answer": 2,
"explanation": "Static members belong to the class, not individual instances.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-encapsulation",
"text": "Why are private variables used inside classes?",
"options": ["To increase memory usage", "To restrict direct access and enforce control", "To allow global access", "To reduce compilation time"],
"answer": 1,
"explanation": "Encapsulation hides data and allows controlled access via methods.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-reference",
"text": "If two references point to the same object, modifying one will:",
"options": ["Not affect the other", "Cause runtime error", "Reflect changes in both", "Create a new object"],
"answer": 2,
"explanation": "Both references point to the same memory location.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-object-copy",
"text": "Which operation creates a new object with copied values but different reference?",
"options": ["Assignment", "Shallow copy", "Reference binding", "Pointer aliasing"],
"answer": 1,
"explanation": "Shallow copy duplicates values but keeps a separate object.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-method-binding",
"text": "Method calls on objects are resolved based on:",
"options": ["Variable name", "Object type at runtime", "Memory address only", "Compiler heuristics"],
"answer": 1,
"explanation": "Dynamic binding resolves method calls using runtime object type.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-constructor-overload",
"text": "Why use multiple constructors in a class?",
"options": ["To reduce memory", "To initialize objects differently", "To prevent instantiation", "To enforce inheritance"],
"answer": 1,
"explanation": "Constructor overloading allows flexible initialization.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-this-keyword",
"text": "What is the role of 'this' keyword inside a class?",
"options": ["Refers to parent class", "Refers to current object", "Creates new object", "Destroys object"],
"answer": 1,
"explanation": "'this' points to the current instance of the class.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-object-lifecycle",
"text": "When does an object become eligible for destruction?",
"options": ["When method ends", "When reference count is zero", "When class is deleted", "When constructor finishes"],
"answer": 1,
"explanation": "Objects are destroyed when no references point to them.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-static-vs-instance",
"text": "Why can't static methods access instance variables directly?",
"options": ["Because of memory limits", "They are not bound to any object", "Compiler restriction only", "Due to inheritance rules"],
"answer": 1,
"explanation": "Static methods belong to class, not instance.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-object-passing",
"text": "Passing an object to a function typically passes:",
"options": ["Entire object copy", "Reference to object", "Only primitive fields", "Class definition"],
"answer": 1,
"explanation": "Most languages pass object references, not full copies.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-null-reference",
"text": "What happens if a method is called on a null object reference?",
"options": ["Ignored silently", "Creates object automatically", "Throws runtime error", "Returns default value"],
"answer": 2,
"explanation": "Dereferencing null leads to runtime error.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-object-comparison",
"text": "Comparing two objects using == checks:",
"options": ["Content equality", "Reference equality", "Field equality", "Method equality"],
"answer": 1,
"explanation": "== compares memory addresses, not contents.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-deep-copy",
"text": "Deep copy differs from shallow copy because:",
"options": ["It copies references only", "It duplicates nested objects too", "It avoids memory allocation", "It uses static memory"],
"answer": 1,
"explanation": "Deep copy recursively duplicates all referenced objects.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-class-design",
"text": "Why should classes have minimal public fields?",
"options": ["To reduce memory", "To enforce abstraction and control access", "To increase speed", "To allow inheritance"],
"answer": 1,
"explanation": "Limiting exposure maintains encapsulation.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-object-reuse",
"text": "Reusing an existing object reference instead of creating new reduces:",
"options": ["CPU usage only", "Memory overhead", "Compilation time", "Code size"],
"answer": 1,
"explanation": "Avoids unnecessary allocations in heap.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-constructor-call",
"text": "When is a constructor invoked?",
"options": ["When class is loaded", "When object is created", "When method is called", "When variable is declared"],
"answer": 1,
"explanation": "Constructor runs during object instantiation.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-object-state",
"text": "Object state is defined by:",
"options": ["Class methods", "Static variables", "Instance variable values", "Constructors"],
"answer": 2,
"explanation": "State refers to current values of instance variables.",
"beta": -2.5
},
{
"topicId": "oop-basics",
"subject": "oop",
"tag": "oop-basics-class-vs-object",
"text": "Which best differentiates a class from an object?",
"options": ["Class is runtime entity", "Object is blueprint", "Class is blueprint, object is instance", "Both are same"],
"answer": 2,
"explanation": "Class defines structure, object is its concrete instance.",
"beta": -2.5
},

{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-encapsulation-control",
"text": "Why does encapsulation improve maintainability in large systems?",
"options": ["It increases coupling", "It hides implementation details allowing internal changes without affecting users", "It forces all methods to be public", "It eliminates inheritance"],
"answer": 1,
"explanation": "Encapsulation hides internal logic so changes don’t impact external code.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-abstraction-interface",
"text": "How does abstraction reduce system complexity?",
"options": ["By exposing all details", "By hiding unnecessary details and showing only essential features", "By avoiding classes", "By eliminating objects"],
"answer": 1,
"explanation": "Abstraction focuses on what is needed, hiding implementation details.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-inheritance-reuse",
"text": "Why is inheritance considered a code reuse mechanism?",
"options": ["It duplicates code", "It allows child classes to reuse parent logic", "It removes methods", "It avoids polymorphism"],
"answer": 1,
"explanation": "Child classes inherit behavior, reducing duplication.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-polymorphism-runtime",
"text": "What enables runtime polymorphism in OOP?",
"options": ["Function overloading", "Operator overloading", "Method overriding with dynamic binding", "Static methods"],
"answer": 2,
"explanation": "Runtime polymorphism relies on overriding and late binding.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-encapsulation-access",
"text": "If all class members are public, what issue arises?",
"options": ["Better performance", "Loss of control over data integrity", "Improved abstraction", "Reduced memory usage"],
"answer": 1,
"explanation": "Public access breaks encapsulation and can corrupt data.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-abstraction-design",
"text": "Which design principle is most aligned with abstraction?",
"options": ["Expose everything", "Program to implementation", "Program to interface", "Avoid classes"],
"answer": 2,
"explanation": "Abstraction encourages coding against interfaces, not implementations.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-inheritance-coupling",
"text": "What is a major downside of excessive inheritance?",
"options": ["Reduced reuse", "Increased coupling between classes", "Loss of polymorphism", "Slower compilation only"],
"answer": 1,
"explanation": "Tight coupling makes systems harder to modify.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-polymorphism-flexibility",
"text": "Why is polymorphism useful in API design?",
"options": ["It restricts method calls", "It allows interchangeable use of objects via common interface", "It removes inheritance", "It prevents overriding"],
"answer": 1,
"explanation": "Polymorphism enables flexible and extensible APIs.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-encapsulation-data",
"text": "Encapsulation primarily protects:",
"options": ["Code comments", "Class names", "Object state (data)", "Inheritance hierarchy"],
"answer": 2,
"explanation": "It ensures data integrity by restricting access.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-abstraction-layer",
"text": "Abstraction layers in systems mainly help in:",
"options": ["Reducing runtime memory", "Separating concerns", "Increasing coupling", "Removing interfaces"],
"answer": 1,
"explanation": "They isolate different system responsibilities.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-inheritance-overriding",
"text": "When a subclass overrides a method, what principle is applied?",
"options": ["Encapsulation", "Abstraction", "Polymorphism", "Aggregation"],
"answer": 2,
"explanation": "Overriding enables runtime polymorphism.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-polymorphism-overloading",
"text": "Function overloading is an example of:",
"options": ["Runtime polymorphism", "Compile-time polymorphism", "Encapsulation", "Inheritance"],
"answer": 1,
"explanation": "Overloading is resolved at compile time.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-encapsulation-modularity",
"text": "Encapsulation contributes to modularity by:",
"options": ["Exposing all internals", "Grouping data and methods together", "Avoiding classes", "Eliminating functions"],
"answer": 1,
"explanation": "It bundles related data and behavior into units.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-abstraction-hiding",
"text": "Which scenario best demonstrates abstraction?",
"options": ["Accessing raw memory directly", "Using a car without knowing engine details", "Editing class internals", "Avoiding interfaces"],
"answer": 1,
"explanation": "Users interact with functionality without knowing implementation.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-inheritance-hierarchy",
"text": "Deep inheritance hierarchies often lead to:",
"options": ["Better modularity", "Increased complexity and fragility", "Improved performance", "Simpler debugging"],
"answer": 1,
"explanation": "Too many layers make behavior harder to track.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-polymorphism-substitution",
"text": "Polymorphism relies on which key principle?",
"options": ["Encapsulation", "Substitutability (LSP)", "Inheritance depth", "Static binding"],
"answer": 1,
"explanation": "Objects should be replaceable with their subtypes.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-encapsulation-security",
"text": "How does encapsulation improve security?",
"options": ["By exposing APIs", "By restricting unauthorized access to data", "By removing methods", "By avoiding objects"],
"answer": 1,
"explanation": "Access modifiers prevent unintended modifications.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-abstraction-decoupling",
"text": "Abstraction helps decoupling by:",
"options": ["Binding implementation tightly", "Hiding dependencies behind interfaces", "Removing methods", "Avoiding polymorphism"],
"answer": 1,
"explanation": "Interfaces reduce dependency on concrete classes.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-inheritance-vs-composition",
"text": "Why is composition often preferred over inheritance?",
"options": ["It increases coupling", "It provides more flexibility and loose coupling", "It removes reuse", "It avoids objects"],
"answer": 1,
"explanation": "Composition allows dynamic behavior changes.",
"beta": -1.0
},
{
"topicId": "oop-pillars",
"subject": "oop",
"tag": "oop-pillars-polymorphism-dynamic",
"text": "Dynamic method dispatch depends on:",
"options": ["Reference type", "Object type at runtime", "Compile-time type only", "Variable name"],
"answer": 1,
"explanation": "Runtime type determines which method is executed.",
"beta": -1.0
},


{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-abstract-instantiation",
"text": "Why can't abstract classes be instantiated directly?",
"options": ["They lack constructors", "They may contain incomplete behavior", "They consume more memory", "They do not support inheritance"],
"answer": 1,
"explanation": "Abstract classes can have unimplemented methods, so instantiation is not meaningful.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-interface-contract",
"text": "What is the primary role of an interface in OOP design?",
"options": ["Provide implementation", "Define a contract for behavior", "Store object state", "Replace inheritance"],
"answer": 1,
"explanation": "Interfaces specify what must be implemented, not how.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-multiple-inheritance",
"text": "Why do many languages allow multiple interfaces but not multiple class inheritance?",
"options": ["Interfaces use less memory", "Interfaces avoid ambiguity by not carrying state", "Classes are slower", "Interfaces cannot be extended"],
"answer": 1,
"explanation": "Interfaces avoid diamond problem since they lack implementation/state.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-abstract-vs-interface",
"text": "When should an abstract class be preferred over an interface?",
"options": ["When multiple inheritance is required", "When shared state or partial implementation is needed", "When no methods are needed", "When performance is critical"],
"answer": 1,
"explanation": "Abstract classes allow shared fields and method implementations.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-polymorphism",
"text": "How do interfaces support polymorphism?",
"options": ["By storing data", "By enabling different classes to be treated uniformly", "By preventing overriding", "By enforcing constructors"],
"answer": 1,
"explanation": "Objects implementing the same interface can be used interchangeably.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-abstract-method",
"text": "What happens if a subclass does not implement all abstract methods?",
"options": ["Compilation error unless subclass is abstract", "Runtime error only", "Methods are ignored", "Defaults are applied automatically"],
"answer": 0,
"explanation": "Subclass must implement or itself be declared abstract.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-default-methods",
"text": "Why were default methods introduced in interfaces (e.g., Java 8)?",
"options": ["To allow state in interfaces", "To enable backward-compatible evolution", "To replace abstract classes", "To enforce inheritance"],
"answer": 1,
"explanation": "Default methods let interfaces evolve without breaking implementations.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-coupling",
"text": "Using interfaces instead of concrete classes reduces:",
"options": ["Runtime speed", "Coupling between components", "Code readability", "Method calls"],
"answer": 1,
"explanation": "Interfaces decouple implementation from usage.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-override",
"text": "When implementing an interface, methods must be:",
"options": ["Private", "Static", "Public", "Final"],
"answer": 2,
"explanation": "Interface methods are implicitly public, so implementations must be public.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-state",
"text": "Why don't interfaces typically maintain instance state?",
"options": ["They cannot define methods", "They are meant for behavior contracts only", "They increase memory usage", "They prevent inheritance"],
"answer": 1,
"explanation": "Interfaces focus on behavior, not object data.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-abstract-hierarchy",
"text": "What is a benefit of abstract classes in hierarchy design?",
"options": ["They prevent reuse", "They allow shared logic across subclasses", "They eliminate polymorphism", "They restrict inheritance"],
"answer": 1,
"explanation": "Abstract classes centralize common behavior.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-implementation-choice",
"text": "Why might a developer choose interface over abstract class?",
"options": ["To share state", "To allow multiple inheritance of type", "To restrict polymorphism", "To avoid overriding"],
"answer": 1,
"explanation": "Interfaces allow multiple inheritance of behavior contracts.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-runtime-binding",
"text": "Interface references enable which behavior?",
"options": ["Static binding only", "Dynamic dispatch at runtime", "Compile-time resolution only", "No polymorphism"],
"answer": 1,
"explanation": "Method calls resolve at runtime based on actual object.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-design-principle",
"text": "Which principle is reinforced by interfaces?",
"options": ["Program to implementation", "Program to interface", "Avoid abstraction", "Avoid polymorphism"],
"answer": 1,
"explanation": "Interfaces promote coding against abstractions.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-multiple-impl",
"text": "What happens when a class implements multiple interfaces with same method signature?",
"options": ["Compilation error always", "Single implementation satisfies all", "Methods are duplicated", "Runtime conflict"],
"answer": 1,
"explanation": "One method implementation fulfills all interface contracts.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-abstract-constructor",
"text": "Why can abstract classes have constructors?",
"options": ["To create objects directly", "To initialize common state for subclasses", "To override interfaces", "To enforce polymorphism"],
"answer": 1,
"explanation": "Constructors initialize inherited fields in subclasses.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-interface-evolution",
"text": "Adding a new abstract method to an interface breaks existing implementations because:",
"options": ["Interfaces cannot change", "Classes must implement all methods", "It changes memory layout", "It disables inheritance"],
"answer": 1,
"explanation": "Existing classes must implement newly added methods.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-loose-coupling",
"text": "Interfaces enable loose coupling by:",
"options": ["Fixing implementation", "Separating definition from implementation", "Removing methods", "Avoiding classes"],
"answer": 1,
"explanation": "Users depend on contracts, not concrete classes.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-polymorphic-collection",
"text": "Why can a collection of interface type hold objects of different classes?",
"options": ["They share memory", "They implement same interface contract", "They inherit same class", "They use static binding"],
"answer": 1,
"explanation": "All objects conform to the same interface type.",
"beta": 0.0
},
{
"topicId": "oop-interfaces",
"subject": "oop",
"tag": "oop-interfaces-abstract-final",
"text": "Why can't a method be both abstract and final?",
"options": ["Compiler limitation", "Abstract requires override, final forbids it", "Memory issue", "Runtime conflict"],
"answer": 1,
"explanation": "Abstract needs overriding, final prevents overriding.",
"beta": 0.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-srp-responsibility",
"text": "A class handles file reading, parsing, and logging. Which issue arises?",
"options": ["Violates SRP by having multiple reasons to change", "Breaks polymorphism", "Prevents inheritance", "Causes memory leak"],
"answer": 0,
"explanation": "SRP requires a class to have only one reason to change.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-ocp-extension",
"text": "How does Open/Closed Principle improve maintainability?",
"options": ["By modifying existing code frequently", "By allowing extension without modifying existing code", "By restricting inheritance", "By removing abstraction"],
"answer": 1,
"explanation": "OCP allows adding features via extension, avoiding changes to stable code.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-lsp-substitution",
"text": "Which scenario violates Liskov Substitution Principle?",
"options": ["Subclass overrides method with same behavior", "Subclass throws unexpected exceptions for valid base operations", "Subclass extends functionality safely", "Subclass adds new methods"],
"answer": 1,
"explanation": "LSP requires subclasses to behave consistently with base class expectations.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-isp-interface",
"text": "Why is a large interface with many unused methods problematic?",
"options": ["Improves flexibility", "Violates ISP forcing unnecessary implementations", "Enhances abstraction", "Reduces coupling"],
"answer": 1,
"explanation": "ISP suggests smaller, specific interfaces to avoid forcing unused methods.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-dip-dependency",
"text": "What does Dependency Inversion Principle promote?",
"options": ["Depend on concrete classes", "Depend on abstractions instead of concrete implementations", "Avoid interfaces", "Remove polymorphism"],
"answer": 1,
"explanation": "DIP decouples high-level modules from low-level implementations.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-srp-cohesion",
"text": "A class with high cohesion typically:",
"options": ["Handles unrelated tasks", "Focuses on a single responsibility", "Depends heavily on others", "Avoids encapsulation"],
"answer": 1,
"explanation": "High cohesion aligns with SRP—one focused responsibility.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-ocp-polymorphism",
"text": "Which technique best supports OCP?",
"options": ["Hardcoding conditions", "Using polymorphism and interfaces", "Avoiding classes", "Using global variables"],
"answer": 1,
"explanation": "Polymorphism allows extending behavior without modifying code.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-lsp-behavior",
"text": "Why must overridden methods not strengthen preconditions?",
"options": ["To improve speed", "To ensure substitutability", "To reduce memory", "To avoid inheritance"],
"answer": 1,
"explanation": "Stronger preconditions break LSP as base expectations fail.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-isp-granularity",
"text": "Breaking a large interface into smaller ones achieves:",
"options": ["Tighter coupling", "Better modularity and flexibility", "Reduced abstraction", "Increased complexity"],
"answer": 1,
"explanation": "Smaller interfaces allow clients to depend only on what they use.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-dip-injection",
"text": "Dependency Injection helps implement DIP by:",
"options": ["Hardcoding dependencies", "Providing dependencies externally", "Removing abstraction", "Avoiding interfaces"],
"answer": 1,
"explanation": "DI supplies abstractions externally, reducing coupling.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-srp-change",
"text": "A violation of SRP is indicated when a class:",
"options": ["Has one method", "Changes for multiple unrelated reasons", "Uses inheritance", "Implements interfaces"],
"answer": 1,
"explanation": "Multiple reasons to change indicate multiple responsibilities.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-ocp-risk",
"text": "Frequent modification of stable code increases:",
"options": ["Flexibility", "Risk of introducing bugs", "Abstraction", "Encapsulation"],
"answer": 1,
"explanation": "OCP avoids modifying stable code to reduce regression risk.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-lsp-design",
"text": "Which design choice supports LSP?",
"options": ["Throwing new exceptions arbitrarily", "Maintaining expected behavior contracts", "Restricting subclass methods", "Avoiding inheritance"],
"answer": 1,
"explanation": "Subclasses must honor base class behavior expectations.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-isp-client",
"text": "ISP focuses on which perspective?",
"options": ["Developer convenience", "Client-specific interfaces", "Compiler optimization", "Runtime performance"],
"answer": 1,
"explanation": "Interfaces should be tailored to client needs.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-dip-layer",
"text": "In DIP, high-level modules should:",
"options": ["Depend on low-level modules", "Depend on abstractions", "Avoid interfaces", "Control memory directly"],
"answer": 1,
"explanation": "Abstractions decouple high-level from implementation details.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-srp-modularity",
"text": "SRP improves modularity because:",
"options": ["Classes are tightly coupled", "Each module has a clear purpose", "All logic is centralized", "Inheritance is removed"],
"answer": 1,
"explanation": "Single responsibility leads to clear modular boundaries.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-ocp-strategy",
"text": "Which pattern best aligns with OCP?",
"options": ["Singleton", "Strategy", "Observer", "Factory"],
"answer": 1,
"explanation": "Strategy allows behavior extension without modifying existing code.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-lsp-inheritance",
"text": "Improper inheritance often violates:",
"options": ["SRP", "LSP", "ISP", "DIP"],
"answer": 1,
"explanation": "Incorrect subclass behavior breaks substitutability.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-isp-fat-interface",
"text": "A 'fat interface' leads to:",
"options": ["Better abstraction", "Unnecessary method implementation burden", "Improved performance", "Reduced coupling"],
"answer": 1,
"explanation": "Clients must implement unused methods, violating ISP.",
"beta": 1.0
},
{
"topicId": "oop-solid",
"subject": "oop",
"tag": "oop-solid-dip-flexibility",
"text": "DIP increases flexibility because:",
"options": ["Concrete classes are fixed", "Implementations can be swapped easily", "Inheritance is removed", "Interfaces are avoided"],
"answer": 1,
"explanation": "Abstraction allows changing implementations without affecting clients.",
"beta": 1.0
},

{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-singleton-concurrency",
"text": "Why is lazy Singleton implementation unsafe in multithreaded environments without synchronization?",
"options": ["It consumes more memory", "Multiple instances may be created due to race conditions", "It prevents inheritance", "It reduces performance"],
"answer": 1,
"explanation": "Race conditions can cause multiple threads to create separate instances.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-factory-decoupling",
"text": "How does Factory pattern reduce coupling?",
"options": ["By exposing constructors", "By delegating object creation to subclasses", "By removing polymorphism", "By using global variables"],
"answer": 1,
"explanation": "Factory encapsulates creation logic, reducing dependency on concrete classes.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-observer-event",
"text": "Which issue arises if observers are not properly deregistered?",
"options": ["Compile-time error", "Memory leaks due to lingering references", "Loss of abstraction", "Reduced polymorphism"],
"answer": 1,
"explanation": "Unremoved observers keep references, preventing garbage collection.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-strategy-runtime",
"text": "What advantage does Strategy pattern provide over conditional logic?",
"options": ["Reduces runtime decisions", "Encapsulates interchangeable behaviors", "Eliminates polymorphism", "Avoids abstraction"],
"answer": 1,
"explanation": "Strategies allow dynamic selection of behavior at runtime.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-decorator-extension",
"text": "How does Decorator pattern differ from inheritance?",
"options": ["Adds behavior at compile time", "Adds behavior dynamically without modifying original class", "Removes functionality", "Avoids objects"],
"answer": 1,
"explanation": "Decorator wraps objects to extend behavior at runtime.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-adapter-compatibility",
"text": "Adapter pattern is useful when:",
"options": ["Classes share same interface", "Incompatible interfaces need to work together", "Avoiding inheritance", "Improving memory usage"],
"answer": 1,
"explanation": "Adapter converts one interface to another expected by clients.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-facade-simplification",
"text": "Facade pattern primarily aims to:",
"options": ["Increase complexity", "Provide simplified interface to complex subsystem", "Remove abstraction", "Avoid encapsulation"],
"answer": 1,
"explanation": "Facade hides subsystem complexity behind a simple interface.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-command-decoupling",
"text": "Command pattern helps in:",
"options": ["Coupling sender and receiver tightly", "Encapsulating requests as objects", "Removing polymorphism", "Avoiding objects"],
"answer": 1,
"explanation": "Commands decouple invoker from execution logic.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-builder-complex",
"text": "Builder pattern is preferred when:",
"options": ["Object is simple", "Object construction involves many optional parameters", "No constructor exists", "Inheritance is not allowed"],
"answer": 1,
"explanation": "Builder manages step-by-step construction of complex objects.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-prototype-copy",
"text": "Prototype pattern avoids costly object creation by:",
"options": ["Using static methods", "Cloning existing instances", "Avoiding objects", "Using global variables"],
"answer": 1,
"explanation": "Cloning is faster than creating from scratch in some cases.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-singleton-global",
"text": "Why is Singleton often criticized?",
"options": ["Too many instances", "Acts like global state and hinders testing", "Improves modularity", "Reduces coupling"],
"answer": 1,
"explanation": "Global state introduces hidden dependencies and testing issues.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-observer-coupling",
"text": "Observer pattern reduces coupling by:",
"options": ["Direct method calls", "Using event-based notification", "Avoiding interfaces", "Removing abstraction"],
"answer": 1,
"explanation": "Observers subscribe and react without tight dependencies.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-strategy-replace",
"text": "Replacing if-else chains with Strategy pattern achieves:",
"options": ["Increased complexity", "Cleaner and extensible behavior selection", "Reduced flexibility", "Compile-time binding"],
"answer": 1,
"explanation": "Strategy removes conditionals and supports extension.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-decorator-stack",
"text": "Multiple decorators can be applied because:",
"options": ["They share static methods", "They follow same interface as wrapped object", "They remove inheritance", "They avoid polymorphism"],
"answer": 1,
"explanation": "Decorators implement same interface, allowing chaining.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-adapter-vs-facade",
"text": "Difference between Adapter and Facade is:",
"options": ["Adapter simplifies, Facade converts interface", "Adapter converts interface, Facade simplifies usage", "Both are identical", "Neither uses abstraction"],
"answer": 1,
"explanation": "Adapter changes interface, Facade provides simplified interface.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-command-undo",
"text": "Command pattern supports undo functionality because:",
"options": ["It stores requests as objects", "It avoids objects", "It uses inheritance only", "It removes polymorphism"],
"answer": 0,
"explanation": "Commands can store state to reverse actions.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-builder-immutability",
"text": "Builder pattern helps create immutable objects by:",
"options": ["Allowing direct field access", "Constructing fully initialized objects before exposure", "Using static variables", "Avoiding constructors"],
"answer": 1,
"explanation": "Object is built stepwise and exposed only when complete.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-prototype-deepcopy",
"text": "Prototype pattern must handle deep copy when:",
"options": ["Object has no fields", "Object contains nested mutable objects", "Object is static", "Object uses inheritance"],
"answer": 1,
"explanation": "Deep copy ensures independent duplication of nested objects.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-factory-vs-builder",
"text": "Factory differs from Builder because:",
"options": ["Factory builds stepwise, Builder creates instantly", "Factory focuses on creation type, Builder on construction process", "Both are identical", "Builder avoids objects"],
"answer": 1,
"explanation": "Factory chooses type, Builder manages complex construction.",
"beta": 2.0
},
{
"topicId": "oop-patterns",
"subject": "oop",
"tag": "oop-patterns-facade-dependency",
"text": "Using Facade reduces dependency by:",
"options": ["Exposing all subsystems", "Centralizing interaction through a single interface", "Removing abstraction", "Avoiding classes"],
"answer": 1,
"explanation": "Clients depend on facade instead of multiple subsystems.",
"beta": 2.0
},




{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-type-safety",
"text": "How do generics improve type safety compared to raw types?",
"options": ["By allowing implicit casting", "By enforcing compile-time type checks", "By removing polymorphism", "By increasing runtime checks only"],
"answer": 1,
"explanation": "Generics catch type mismatches at compile time, reducing runtime errors.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-erasure",
"text": "What is a consequence of type erasure in Java generics?",
"options": ["Generics exist at runtime fully", "Type information is removed at runtime", "Objects cannot be created", "Inheritance is disabled"],
"answer": 1,
"explanation": "Type erasure removes generic type info at runtime.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-bounds",
"text": "Why are bounded type parameters useful?",
"options": ["They remove type checking", "They restrict types to a certain hierarchy", "They increase runtime overhead", "They avoid polymorphism"],
"answer": 1,
"explanation": "Bounds ensure only valid types are used.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-wildcard",
"text": "What does an unbounded wildcard '?' represent?",
"options": ["Only Object type", "Any type", "No type allowed", "Primitive types only"],
"answer": 1,
"explanation": "It can represent any type.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-covariance",
"text": "Why is List not a subtype of List?",
"options": ["Because generics are invariant", "Because of runtime errors only", "Because Integer is not a Number", "Because lists cannot hold numbers"],
"answer": 0,
"explanation": "Generic types are invariant to prevent unsafe assignments.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-extends",
"text": "What does '? extends T' allow?",
"options": ["Only T exactly", "Any subtype of T", "Any supertype of T", "No types"],
"answer": 1,
"explanation": "Upper bounded wildcard allows subtypes of T.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-super",
"text": "What does '? super T' allow?",
"options": ["Subtypes of T", "Supertypes of T", "Only T", "No types"],
"answer": 1,
"explanation": "Lower bound allows supertypes of T.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-peek",
"text": "Why can you safely read from '? extends T' but not write?",
"options": ["Type unknown for insertion", "Compiler restriction only", "Memory issue", "Inheritance issue"],
"answer": 0,
"explanation": "Exact type is unknown, so insertion is unsafe.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-write",
"text": "Why can you write to '? super T' but not safely read specific type?",
"options": ["Unknown exact subtype returned", "Compiler bug", "Memory optimization", "No polymorphism"],
"answer": 0,
"explanation": "Returned type could be Object or supertype, not guaranteed T.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-method",
"text": "Generic methods differ from generic classes because:",
"options": ["They cannot have type parameters", "They declare type parameters per method", "They avoid polymorphism", "They use runtime typing"],
"answer": 1,
"explanation": "Method-level generics allow flexibility per invocation.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-type-inference",
"text": "Type inference in generics helps by:",
"options": ["Eliminating types entirely", "Reducing need to explicitly specify type parameters", "Removing type safety", "Using runtime resolution"],
"answer": 1,
"explanation": "Compiler infers types automatically.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-overloading",
"text": "Why can't methods differ only by generic type parameters?",
"options": ["Compiler limitation", "Type erasure removes distinction", "Inheritance issue", "Runtime conflict only"],
"answer": 1,
"explanation": "After erasure, signatures become identical.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-array",
"text": "Why are generic arrays not allowed in Java?",
"options": ["Memory issue", "They break type safety due to runtime type checking", "They increase performance", "They prevent inheritance"],
"answer": 1,
"explanation": "Arrays are covariant and reified, causing unsafe scenarios.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-template",
"text": "C++ templates differ from Java generics because:",
"options": ["Templates use runtime typing", "Templates are resolved at compile time without erasure", "Templates avoid polymorphism", "Templates do not support types"],
"answer": 1,
"explanation": "C++ templates generate code at compile time.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-polymorphism",
"text": "Generics enhance polymorphism by:",
"options": ["Restricting types", "Allowing parameterized types with compile-time checks", "Avoiding inheritance", "Using runtime casting"],
"answer": 1,
"explanation": "They allow flexible yet safe polymorphic code.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-raw",
"text": "Using raw types leads to:",
"options": ["Compile-time safety", "Unchecked warnings and potential runtime errors", "Improved performance", "No type issues"],
"answer": 1,
"explanation": "Raw types bypass generics checks.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-casting",
"text": "Why is explicit casting reduced with generics?",
"options": ["Compiler removes types", "Type information is enforced at compile time", "Runtime casting increases", "Inheritance is removed"],
"answer": 1,
"explanation": "Generics ensure correct type, reducing need for casts.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-nested",
"text": "Nested generics (e.g., List<List>) increase:",
"options": ["Runtime overhead", "Type expressiveness and safety", "Memory leaks", "Compilation errors"],
"answer": 1,
"explanation": "They allow modeling complex structured data safely.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-variance",
"text": "Variance in generics controls:",
"options": ["Memory allocation", "Type substitution relationships", "Runtime speed", "Inheritance removal"],
"answer": 1,
"explanation": "Variance defines how subtyping works with generics.",
"beta": 0.5
},
{
"topicId": "oop-generics",
"subject": "oop",
"tag": "oop-generics-constraint",
"text": "Why use multiple bounds (e.g., <T extends A & B>)?",
"options": ["To remove type safety", "To enforce multiple constraints on type parameter", "To improve runtime speed", "To avoid inheritance"],
"answer": 1,
"explanation": "It ensures T satisfies multiple type requirements.",
"beta": 0.5
},

{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-has-a",
"text": "Why is composition described as a 'has-a' relationship?",
"options": ["Because classes inherit behavior", "Because one object contains another as a part", "Because objects share memory", "Because inheritance is avoided"],
"answer": 1,
"explanation": "Composition models objects as being composed of other objects.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-flexibility",
"text": "Why is composition often preferred over inheritance for flexibility?",
"options": ["It prevents reuse", "Behavior can be changed at runtime by swapping components", "It reduces polymorphism", "It avoids objects"],
"answer": 1,
"explanation": "Composition allows dynamic behavior changes without altering class hierarchy.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-coupling",
"text": "Compared to inheritance, composition typically results in:",
"options": ["Tighter coupling", "Looser coupling", "No coupling", "Compile-time errors"],
"answer": 1,
"explanation": "Composition reduces dependency on parent class structure.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-reuse",
"text": "How does composition support code reuse?",
"options": ["By copying code", "By reusing existing components within objects", "By avoiding classes", "By removing polymorphism"],
"answer": 1,
"explanation": "Objects reuse functionality by delegating to composed objects.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-inheritance-limit",
"text": "What is a limitation of inheritance that composition avoids?",
"options": ["Code reuse", "Rigid class hierarchy", "Encapsulation", "Polymorphism"],
"answer": 1,
"explanation": "Inheritance creates tight coupling and rigid structures.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-runtime",
"text": "Which approach allows behavior changes at runtime?",
"options": ["Inheritance only", "Composition", "Static binding", "Compile-time polymorphism"],
"answer": 1,
"explanation": "Composition allows replacing components dynamically.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-delegation",
"text": "Delegation in composition means:",
"options": ["Copying methods", "Forwarding calls to composed objects", "Avoiding method calls", "Removing classes"],
"answer": 1,
"explanation": "Objects delegate responsibilities to their components.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-overriding",
"text": "Inheritance relies on overriding, while composition relies on:",
"options": ["Static methods", "Delegation", "Global variables", "Inheritance again"],
"answer": 1,
"explanation": "Composition achieves behavior reuse via delegation.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-testing",
"text": "Why is composition easier to test?",
"options": ["It avoids objects", "Components can be mocked independently", "It removes methods", "It increases coupling"],
"answer": 1,
"explanation": "Individual components can be tested in isolation.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-is-a",
"text": "Inheritance represents which relationship?",
"options": ["has-a", "uses-a", "is-a", "part-of"],
"answer": 2,
"explanation": "Inheritance models an 'is-a' relationship.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-fragile-base",
"text": "The fragile base class problem is associated with:",
"options": ["Composition", "Inheritance", "Encapsulation", "Abstraction"],
"answer": 1,
"explanation": "Changes in base class can break subclasses.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-encapsulation",
"text": "Composition improves encapsulation by:",
"options": ["Exposing all internals", "Hiding implementation inside components", "Avoiding classes", "Removing methods"],
"answer": 1,
"explanation": "Internal components are hidden behind interfaces.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-multiple",
"text": "Which approach naturally supports combining multiple behaviors?",
"options": ["Single inheritance", "Composition", "Static methods", "Final classes"],
"answer": 1,
"explanation": "Composition allows combining multiple components.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-dependency",
"text": "Inheritance creates dependency on:",
"options": ["Interfaces only", "Base class implementation", "Runtime objects", "Local variables"],
"answer": 1,
"explanation": "Subclasses depend on base class details.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-change",
"text": "Which approach minimizes impact of changes in one class?",
"options": ["Inheritance", "Composition", "Static binding", "Global variables"],
"answer": 1,
"explanation": "Loose coupling in composition reduces ripple effects.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-polymorphism",
"text": "Composition can achieve polymorphism via:",
"options": ["Inheritance only", "Interfaces and delegation", "Global variables", "Static methods"],
"answer": 1,
"explanation": "Delegated objects implement interfaces enabling polymorphism.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-lifecycle",
"text": "In strong composition, the lifecycle of component is:",
"options": ["Independent", "Tied to the parent object", "Global", "Static"],
"answer": 1,
"explanation": "Components are created and destroyed with the parent.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-inheritance-depth",
"text": "Deep inheritance hierarchies often lead to:",
"options": ["Better reuse", "Complex and fragile systems", "Simpler debugging", "Improved flexibility"],
"answer": 1,
"explanation": "Deep hierarchies increase complexity and tight coupling.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-runtime-binding",
"text": "Composition supports runtime binding because:",
"options": ["Methods are static", "Objects can be replaced dynamically", "Inheritance is deep", "Classes are fixed"],
"answer": 1,
"explanation": "Components can be swapped at runtime.",
"beta": 1.5
},
{
"topicId": "oop-composition",
"subject": "oop",
"tag": "oop-composition-design",
"text": "Modern design principles recommend:",
"options": ["Favor inheritance over composition", "Favor composition over inheritance", "Avoid both", "Use only static methods"],
"answer": 1,
"explanation": "Composition provides flexibility and loose coupling.",
"beta": 1.5
}
]



async function main() {
  console.log('Seeding questions...')

  await db.question.createMany({
    data: questions.map(q => ({
      topicId: q.topicId,
      subject: q.subject,
      tag: q.tag,
      text: q.text,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
      beta: q.beta,
    })),
    skipDuplicates: true,
  })

  console.log(`Seeded ${questions.length} questions.`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
